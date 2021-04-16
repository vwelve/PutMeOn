import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(_id: string): Promise<User> {
    return await this.userModel.findOne({ _id }).exec();
  }
  
  async findOrCreateOne(userDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ _id: userDto._id }).exec();

    if (!user) {
      const createdUser = new this.userModel(userDto);
      return createdUser.save();
    }
    return user;
  }
}