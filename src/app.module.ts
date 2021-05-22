import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config/config';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongodb_cluster, {
    connectionFactory: (connection) => {
      connection.plugin(require('mongoose-autopopulate'));
      return connection;
    }
  }), AuthModule, UsersModule, PostsModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
