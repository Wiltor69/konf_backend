import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class EntityLimitService {
  async checkEntityLimit<T>(
    model: Model<T>,
    maxNumOfEntity: number,
  ): Promise<void> {
    const existNumOfEntity = await model.find().countDocuments();

    if (existNumOfEntity >= maxNumOfEntity) {
      throw new ConflictException(
        `Only ${maxNumOfEntity} entries are allowed.`,
      );
    }
  }
}
