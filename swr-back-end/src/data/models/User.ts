import { UserType } from '../types';
import { WithId, Document } from 'mongodb';

export const USER_COLLECTION = 'users';

export function userFromDB(data: WithId<Document>): UserType {
  return {
    id: data.id,
    createdAt: data.createdAt,
    nickname: data.nickname,
    companions: data.companions,
  };
}

export function userToDB(user: UserType): Document {
  return { ...user };
}