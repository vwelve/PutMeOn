import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/decorators/payload.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import IPayload from 'src/auth/interfaces/payload.interface';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import IPost from './interfaces/posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor (private postsService: PostsService, private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Payload() payload: IPayload): Promise<IPost[]> {
        const user = await this.usersService.findById(payload._id);
        const posts: IPost[] = (await this.postsService.findAll(user)).map((post) => ({
            id: post.id,
            playlistId: post.playlistId,
            theme: post.theme,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));

        return posts;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() post: Partial<CreatePostDto>, @Payload() payload: IPayload): Promise<void> {
        post.user = await this.usersService.findById(payload._id);

        await this.postsService.create(<CreatePostDto>post);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(@Body() { id }: { id: string }): Promise<void> {
        await this.postsService.delete(id);
    }


}
