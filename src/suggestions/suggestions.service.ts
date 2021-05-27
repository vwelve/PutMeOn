import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from 'src/posts/schemas/posts.schema';
import { CreateSuggestionDto } from './dto/create-suggestions.dto';
import { Suggestion, SuggestionsDocument } from './schemas/suggestions.schema';
import * as mongoose from 'mongoose';

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

    async findAll(post: Post): Promise<Suggestion[]> {
        return this.suggestionModel.find({ post }).exec();  
    }

    async find(suggestionId: string): Promise<Suggestion> {
        const id = mongoose.Types.ObjectId(suggestionId);
        return this.suggestionModel.findById(id).exec();
    }
}
