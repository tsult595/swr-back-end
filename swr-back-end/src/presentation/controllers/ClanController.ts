import { Request, Response } from 'express';
import { createClan , removeUserFromClan , deleteClan, getClansByUserId , addUserToClan } from '../../data/repositories/ClanRepository';
export async function addUserToClanController(req: Request, res: Response) {
  try {
    const { clanId } = req.params;
    const { userId } = req.body;
    if (!clanId || !userId) {
      return res.status(400).json({ error: 'Missing clanId or userId' });
    }
    await addUserToClan(clanId, userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user to clan' });
  }
}


export async function getClansByUserController(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    const clans = await getClansByUserId(userId);
    res.json(clans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clans' });
  }
}

export async function createClanController(req: Request, res: Response) {
  try {
    const { name, members, ownerId } = req.body;
    if (!name || !Array.isArray(members) || members.length === 0 || !ownerId) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    const clan = await createClan(name, members, ownerId);
    res.status(201).json(clan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create clan' });
  }
}

export async function removeUserFromClanController(req: Request, res: Response) {
  try {
    const { clanId } = req.params;
    const { userId } = req.body;
    if (!clanId || !userId) {
      return res.status(400).json({ error: 'Missing clanId or userId' });
    }
    await removeUserFromClan(clanId, userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user from clan' });
  }
}

export async function deleteClanController(req: Request, res: Response) {
  try {
    const { clanId } = req.params;
    if (!clanId) {
      return res.status(400).json({ error: 'Missing clanId' });
    }
    await deleteClan(clanId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete clan' });
  }
}