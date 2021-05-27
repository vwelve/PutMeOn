import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsService } from 'src/posts/posts.service';
import { CreateSuggestionDto } from './dto/create-suggestions.dto';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
    constructor(private suggestionsService: SuggestionsService, private postsService: PostsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() suggestionDto: CreateSuggestionDto) {
        return this.suggestionsService.create(suggestionDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find(@Body('suggestionId') suggestionId: string) {
        return this.suggestionsService.find(suggestionId);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async findAll(@Body('postId') postId: string) {
        const post = await this.postsService.findOne(postId);
        return this.suggestionsService.findAll(post);
    }
}
