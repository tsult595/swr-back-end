import express from 'express';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

const router = express.Router();

router.get('/api/telegram-news', async (req, res) => {
  try {
    const response = await fetch('https://rsshub.app/telegram/channel/@IA_Coding');
    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const data = parser.parse(xml);
    res.json(data.rss.channel.item || []);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка загрузки новостей' });
  }
});

export default router;