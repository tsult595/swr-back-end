import dotenv from 'dotenv';


dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import routes from './presentation/routes';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Message } from './data/types';

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

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

let chatMessages: Message[] = [];

io.on('connection', (socket) => {

  socket.on('get all messages', () => {
    socket.emit('all messages', chatMessages);
  });

  socket.on('chat message', (msg) => {
    chatMessages.push(msg);
    io.emit('chat message', msg);
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