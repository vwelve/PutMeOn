import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    const _id = mongoose.Types.ObjectId(id);
    return await this.userModel.findById(_id).exec();
  }
  
  async updateOrCreate(userDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ userId: userDto.userId }, { $setOnInsert: userDto }, { upsert: true, new: true }).exec();

    return user;
  }

  async updateAccessToken(userId: string, accessToken: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ userId }, { accessToken });
  }
}