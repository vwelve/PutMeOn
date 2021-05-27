import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  providers: [SuggestionsService],
  controllers: [SuggestionsController],
  imports: [PostsModule]
})
export class SuggestionsModule {}
