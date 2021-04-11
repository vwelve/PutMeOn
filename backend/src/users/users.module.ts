import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UsersSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]), CreateUserDto],
  exports: [UsersService],
})
export class UsersModule {}
