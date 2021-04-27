import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(userId: string): Promise<UserDocument> {
    return await this.userModel.findOne({ userId }).exec();
  }
  
  async findOrCreateOne(userDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate({ userId: userDto.userId }, { $setOnInsert: userDto }, { upsert: true, new: true }).exec();

    return user;
  }

  async updateAccessToken(userId: string, accessToken: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ userId }, { accessToken });
  }
}