import { Favorite } from '../types';

export class FavoriteModel {
  static collectionName = 'favorites';

  static fromDB(data: any): Favorite {
    return {
      userId: data.userId,
      heroId: data.heroId,
      addedAt: new Date(data.addedAt)
    };
  }

  static toDB(favorite: Favorite): any {
    return {
      userId: favorite.userId,
      heroId: favorite.heroId,
      addedAt: favorite.addedAt
    };
  }
}