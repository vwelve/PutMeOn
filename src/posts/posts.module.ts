import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostsSchema } from './schemas/posts.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [MongooseModule.forFeatureAsync([
    { 
      name: Post.name, 
      useFactory: () => {
        const schema = PostsSchema;
        schema.plugin(require('mongoose-autopopulate'));
        return schema;
      }
    }
  ]), UsersModule]
})
export class PostsModule {}
