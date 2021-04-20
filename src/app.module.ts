import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import config from './config/config';

@Module({
  imports: [MongooseModule.forRoot(config.mongodb_cluster), AuthModule, UsersModule, PostsModule, SuggestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
