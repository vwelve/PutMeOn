import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSuggestionDto } from './dto/create-suggestions.dto';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
    constructor(private suggestionsService: SuggestionsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() suggestionDto: CreateSuggestionDto) {
        
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find(@Body('suggestionId') suggestionId: string) {
        
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async findAll(@Body('postId') postId: string) {

    }
}
