import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/posts.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async create(postDto: CreatePostDto): Promise<Post> {
        const newPost = new this.postModel({
            ...postDto,
            _id: Types.ObjectId()
        });
        return newPost.save();
    }

    async findAll(author: User): Promise<Post[]> {
        return this.postModel.find({ author: author }).exec();
    }

    async findOne(postId: string): Promise<Post> {
        const id = mongoose.Types.ObjectId(postId);
        const post = this.postModel.findById(id).exec();

        if (!post) {
            throw new BadRequestException("Cannot find post with that id");
        }

        return post;
    }

    async delete(userId: string, postId: string): Promise<void> {
        const post = await this.postModel.findById(Types.ObjectId(postId)).exec();
        
        if (post && post.author._id.toString() == userId) {
            await post.deleteOne();
        } else {
            throw new BadRequestException("Cannot find post on this user with that id");
        }
    }
}
