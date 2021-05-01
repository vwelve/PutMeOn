import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Suggestion, SuggestionsSchema } from './schemas/suggestion.schema';
import { SuggestionsService } from './suggestions.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Suggestion.name, schema: SuggestionsSchema }])],
  providers: [SuggestionsService]
})
export class SuggestionsModule {}
