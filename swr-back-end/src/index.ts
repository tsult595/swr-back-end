import dotenv from 'dotenv';
dotenv.config();

import { sendMessage } from './domain/usecases/SendMessageUseCase';

import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import routes from './presentation/routes';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Message } from './data/types';
import { getMessages } from './domain/usecases/GetMessagesUseCase';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: process.env.DB_NAME || 'vinivici' });
});

app.use('/api', routes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});



const userSockets = new Map<string, string[]>(); 

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Регистрация пользователя
  socket.on('register user', (userId: string) => {
    if (!userSockets.has(userId)) {
      userSockets.set(userId, []);
    }
    if (!userSockets.get(userId)!.includes(socket.id)) {
      userSockets.get(userId)!.push(socket.id);
    }
  });

  socket.on('register', (userId: string) => {
    if (!userSockets.has(userId)) {
      userSockets.set(userId, []);
    }
    if (!userSockets.get(userId)!.includes(socket.id)) {
      userSockets.get(userId)!.push(socket.id);
    }
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  // Подписка на клановые комнаты
  socket.on('join clans', (clanIds: string[]) => {
    if (Array.isArray(clanIds)) {
      clanIds.forEach(clanId => {
        if (clanId) socket.join(clanId);
      });
    }
  });

  socket.on('chat message', async (msg) => {
    console.log('🔥 RECEIVED chat message:', msg);
    try {
      const savedMsg = await sendMessage(msg);
      console.log('Сохранено в MongoDB:', savedMsg);
      if (savedMsg.type === 'clanChat' && savedMsg.clanId) {
        io.to(savedMsg.clanId).emit('chat message', savedMsg);
      } else if (savedMsg.type === 'private' && savedMsg.recipientId) {
        const recipientSockets = userSockets.get(savedMsg.recipientId);
        if (recipientSockets && recipientSockets.length > 0) {
          recipientSockets.forEach(socketId => {
            io.to(socketId).emit('chat message', savedMsg);
          });
        } else {
          console.log(`Recipient ${savedMsg.recipientId} not connected`);
        }
      } else {
        io.emit('chat message', savedMsg);
      }
    } catch (err) {
      console.error('Ошибка при сохранении сообщения в MongoDB:', err);
    }
  });

  socket.on('get all messages', async () => {
    const allMessages = await getMessages(100);
    const userId = socket.handshake.auth.userId;
    const userClanIds = Array.from(socket.rooms).filter(r => r !== socket.id);

    const filtered = allMessages.filter(msg =>
      msg.type === 'normal' ||
      (msg.type === 'private' && (msg.userId === userId || msg.recipientId === userId)) ||
      (msg.type === 'clanChat' && msg.clanId && userClanIds.includes(msg.clanId))
    );
    socket.emit('all messages', filtered);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove from userSockets
    for (const [userId, sockets] of userSockets.entries()) {
      const index = sockets.indexOf(socket.id);
      if (index > -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          userSockets.delete(userId);
        }
        break;
      }
    }
  });
});

connectToDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server and Socket.IO running: http://localhost:${PORT}`);
    console.log(`📡 Frontend: http://localhost:5173`);
  });
}).catch((error: Error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export { io, userSockets };