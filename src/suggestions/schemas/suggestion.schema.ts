import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import ISong from 'src/common/interfaces/song.interface';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';

export type SuggestionDocument = Suggestion & Document;

@Schema({ timestamps: true })
export class Suggestion {
    @Prop()
    readonly _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: Post;

    @Prop()
    readonly song: ISong;    

    @Prop()
    readonly createdAt: Date;

    @Prop()
    readonly updatedAt: Date;
}

export const SuggestionsSchema = SchemaFactory.createForClass(Suggestion);