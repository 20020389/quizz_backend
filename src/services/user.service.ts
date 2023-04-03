import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private _db: PrismaService) {}

  async getUser(id: string) {
    try {
      return await this._db.user.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'user not found',
        },
        404,
      );
    }
  }

  async addUser(userData: User) {
    try {
      return await this._db.user.create({
        data: userData,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            message: error.message,
          },
          400,
        );
      } else {
        throw new HttpException(error, 400);
      }
    }
  }
}
