import { getDB } from '../../config/database';

export async function createClan(name: string, members: string[]) {
  const db = getDB();
  const result = await db.collection('clans').insertOne({ name, members });
  const clanId = result.insertedId.toString();

  
  await db.collection('users').updateMany(
    { id: { $in: members } },
    { $addToSet: { clans: clanId } }
  );

  return { id: clanId, name, members };
}