import { Favorite, Hero } from '../types';

export class HeroModel {
  static collectionName = 'heroes';

  static fromDB(data: any): Hero {
    return {
      id: data.id,
      name: data.name,
      fileName: data.fileName,
      rarity: data.rarity,
      level: data.level,
      price: data.price,
      bid: data.bid,
      status: data.status
    };
  }

  static toDB(hero: Hero): any {
    return { ...hero };
  }
}