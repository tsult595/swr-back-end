import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME || 'vinivici';

const heroes = [
  { id: 1, name: 'Dragon Mageq', fileName: 'bulbazavr.jpg', rarity: 'High', level: 30, price: 300, bid: 75, status: 'Active' },
  { id: 2, name: 'Dragon Magess', fileName: 'pichachu.jpg', rarity: 'Common', level: 30, price: 300, bid: 75, status: 'Active' },
  { id: 3, name: 'Dragon Magek', fileName: 'catFish.jpg', rarity: 'Common', level: 30, price: 300, bid: 75, status: 'Cancelled' },
  { id: 4, name: 'Dragon Mage', fileName: 'ballPokeman.jpg', rarity: 'Middle', level: 30, price: 300, bid: 75, status: 'Active' },
  { id: 5, name: 'Dragon Mage', fileName: 'blastuas.jpg', rarity: 'Middle', level: 30, price: 300, bid: 75, status: 'Cancelled' },
  { id: 6, name: 'Goblin Rogue', fileName: 'duckPokemon.jpg', rarity: 'Common', level: 15, price: 120, bid: 50, status: 'Active' },
  { id: 7, name: 'Goblin Rogue', fileName: 'charmander.jpg', rarity: 'High', level: 20, price: 120, bid: 50, status: 'Active' }
];

const items = [
  { id: 1, name: 'Sword of Truth', description: 'A legendary sword with immense power.', rarity: 'Legendary' },
  { id: 2, name: 'Shield of Valor', description: 'An unbreakable shield that protects its bearer.', rarity: 'Epic' },
  { id: 3, name: 'Staff of Wisdom', description: 'A magical staff that enhances the wielder\'s intellect.', rarity: 'Rare' },
  { id: 4, name: 'Frontend Link', description: 'http://localhost:5173/', rarity: 'Common' }
];

const misteryBoxes = [
  { id: 1, name: 'Common Mystery Box', description: 'A basic mystery box containing common items and heroes.', rarity: 'Common', price: 50, image: 'common-box.png' },
  { id: 2, name: 'Rare Mystery Box', description: 'An uncommon mystery box with a chance for rare rewards.', rarity: 'Rare', price: 150, image: 'rare-box.png' },
  { id: 3, name: 'Epic Mystery Box', description: 'A powerful mystery box containing epic treasures.', rarity: 'Epic', price: 300, image: 'epic-box.png' },
  { id: 4, name: 'Legendary Mystery Box', description: 'The ultimate mystery box with legendary rewards.', rarity: 'Legendary', price: 500, image: 'legendary-box.png' },
  { id: 5, name: 'Hero Mystery Box', description: 'A special box guaranteed to contain a hero.', rarity: 'Middle', price: 200, image: 'hero-box.png' },
  { id: 6, name: 'Item Mystery Box', description: 'A box focused on powerful items and equipment.', rarity: 'Middle', price: 180, image: 'item-box.png' },
  { id: 7, name: 'Starter Mystery Box', description: 'Perfect for beginners starting their adventure.', rarity: 'Common', price: 25, image: 'starter-box.png' },
  { id: 8, name: 'Premium Mystery Box', description: 'A premium box with guaranteed high-value contents.', rarity: 'High', price: 400, image: 'premium-box.png' }
];

const lotHistory = [
  { heroId: 1, id: 1, type: 'Created auction', from: '0x709...79C8', to: 'Auction', price: 300, date: '2025-12-01T05:31:00Z' },
  { heroId: 1, id: 2, type: 'Bid placed', from: '0x123...456A', to: 'Auction', price: 350, date: '2025-12-02T10:15:00Z' },
  { heroId: 2, id: 3, type: 'Created auction', from: '0x789...012B', to: 'Auction', price: 300, date: '2025-12-03T14:45:00Z' },
  { heroId: 2, id: 4, type: 'Bid placed', from: '0xABC...DEF1', to: 'Auction', price: 320, date: '2025-12-04T09:20:00Z' },
  { heroId: 3, id: 5, type: 'Created auction', from: '0x111...222C', to: 'Auction', price: 300, date: '2025-12-05T11:00:00Z' },
  { heroId: 3, id: 6, type: 'Auction cancelled', from: 'System', to: '0x111...222C', price: 0, date: '2025-12-06T15:30:00Z' },
  { heroId: 4, id: 7, type: 'Created auction', from: '0x333...444D', to: 'Auction', price: 300, date: '2025-12-07T08:15:00Z' },
  { heroId: 4, id: 8, type: 'Bid placed', from: '0x555...666E', to: 'Auction', price: 330, date: '2025-12-08T12:45:00Z' },
  { heroId: 4, id: 9, type: 'Bid placed', from: '0x777...888F', to: 'Auction', price: 360, date: '2025-12-09T16:20:00Z' },
  { heroId: 5, id: 10, type: 'Created auction', from: '0x999...000G', to: 'Auction', price: 300, date: '2025-12-10T07:30:00Z' },
  { heroId: 5, id: 11, type: 'Auction cancelled', from: 'System', to: '0x999...000G', price: 0, date: '2025-12-10T18:00:00Z' },
  { heroId: 6, id: 12, type: 'Created auction', from: '0xAAA...BBBH', to: 'Auction', price: 120, date: '2025-11-28T10:00:00Z' },
  { heroId: 6, id: 13, type: 'Bid placed', from: '0xCCC...DDDI', to: 'Auction', price: 135, date: '2025-11-29T14:30:00Z' },
  { heroId: 6, id: 14, type: 'Bid placed', from: '0xEEE...FFFJ', to: 'Auction', price: 150, date: '2025-11-30T17:45:00Z' },
  { heroId: 7, id: 15, type: 'Created auction', from: '0x000...111K', to: 'Auction', price: 120, date: '2025-11-25T09:00:00Z' },
  { heroId: 7, id: 16, type: 'Bid placed', from: '0x222...333L', to: 'Auction', price: 140, date: '2025-11-26T13:15:00Z' },
  { heroId: 7, id: 17, type: 'Bid placed', from: '0x444...555M', to: 'Auction', price: 160, date: '2025-11-27T15:30:00Z' },
  { heroId: 7, id: 18, type: 'Auction won', from: 'Auction', to: '0x444...555M', price: 160, date: '2025-11-28T18:00:00Z' }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db(DB_NAME);
    
    await db.collection('heroes').deleteMany({});
    await db.collection('lot_history').deleteMany({});
    await db.collection('favorites').deleteMany({});
    await db.collection('items').deleteMany({});
    await db.collection('mystery_boxes').deleteMany({});
    console.log('🗑️  Cleared old data');
    
    await db.collection('heroes').insertMany(heroes);
    await db.collection('lot_history').insertMany(lotHistory);
    await db.collection('items').insertMany(items);
    await db.collection('mystery_boxes').insertMany(misteryBoxes);
    
    console.log(`✅ Inserted ${heroes.length} heroes`);
    console.log(`✅ Inserted ${lotHistory.length} history records`);
    console.log(`✅ Inserted ${items.length} items`);
    console.log(`✅ Inserted ${misteryBoxes.length} mystery boxes`);
    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();