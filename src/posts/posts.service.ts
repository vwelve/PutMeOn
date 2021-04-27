import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async findAll(user: User): Promise<PostDocument[]> {
        return await this.postModel.find({ user }).exec();
    }

    async create(post: CreatePostDto): Promise<void> {
        await this.postModel.create(post);
    }

    async delete(_id: string): Promise<void> {
        await this.postModel.deleteOne({ _id });
    }
}
