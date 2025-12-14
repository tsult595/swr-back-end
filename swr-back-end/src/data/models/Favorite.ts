import { Favorite } from '../types';
import { WithId, Document } from 'mongodb';

export const FAVORITE_COLLECTION = 'favorites';

export function favoriteFromDB(data: WithId<Document>): Favorite {
  return {
    userId: data.userId as string,
    heroId: data.heroId as number,
    addedAt: new Date(data.addedAt as string | Date)
  };
}

export function favoriteToDB(favorite: Favorite): Document {
  return {
    userId: favorite.userId,
    heroId: favorite.heroId,
    addedAt: favorite.addedAt
  };
}