import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSuggestionDto } from './dto/create-suggestions.dto';
import { Suggestion, SuggestionsDocument } from './schemas/suggestions.schema';

@Injectable()
export class SuggestionsService {
    constructor(@InjectModel(Suggestion.name) private suggestionModel: Model<SuggestionsDocument>) {}
    
    async create(suggestionDto: CreateSuggestionDto): Promise<Suggestion> {
        const newSuggestion = new this.suggestionModel({
            ...suggestionDto,
            _id: Types.ObjectId()
        });

        return newSuggestion.save();
    }

    async findAll(postId: string) {
        
    }
}
