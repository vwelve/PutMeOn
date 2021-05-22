import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import Payload from 'src/common/classes/payload';
import Playlist from 'src/common/classes/playlist';
import { GetPayload } from 'src/common/decorators/payload.decorator';
import { UsersService } from 'src/users/users.service';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService, private usersService: UsersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@GetPayload() payload: Payload, @Body() { theme, playlist }: { theme: string, playlist: Playlist }) {
        return this.postsService.create({
            author: payload.id,
            theme,
            playlist
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async list(@GetPayload() payload: Payload) {
        const user = await this.usersService.findById(payload.id);
        return this.postsService.findAll(user);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async delete(@GetPayload() payload: Payload, @Body() { postId }: { postId: string }) {
        return this.postsService.delete(payload.id, postId);
    }
}
