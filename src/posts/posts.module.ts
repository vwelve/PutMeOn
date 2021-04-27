import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostsSchema } from './schemas/post.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([
      { 
        name: Post.name, 
        schema: PostsSchema
      }
    ]), UsersModule],
  controllers: [PostsController]
})
export class PostsModule {}
