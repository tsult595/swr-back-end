import dotenv from 'dotenv';


dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import routes from './presentation/routes';

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

// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
    console.log(`📡 Frontend: http://localhost:5173`);
  });
}).catch((error: Error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});