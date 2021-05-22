import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from "src/users/schemas/user.schema";
import Playlist from "src/common/classes/playlist";

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
    @Prop()
    readonly _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
    readonly author: User;

    @Prop()
    readonly playlist: Playlist;

    @Prop()
    theme: string;

    @Prop()
    readonly createdAt: Date;

    @Prop()
    readonly updatedAt: Date;
}

export const PostsSchema = SchemaFactory.createForClass(Post);