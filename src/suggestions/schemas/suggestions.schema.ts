import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from "src/users/schemas/user.schema";
import Song from "src/common/classes/song";
import { Post } from "src/posts/schemas/posts.schema";

export type SuggestionsDocument = Suggestion & Document;

@Schema({ timestamps: true })
export class Suggestion {
    @Prop()
    readonly _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', autopopulate: true })
    readonly post: Post;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }])
    readonly suggestors: User[];

    @Prop()
    readonly song: Song;

    @Prop()
    readonly createdAt: Date;

    @Prop()
    readonly updatedAt: Date;
}

export const SuggestionssSchema = SchemaFactory.createForClass(Suggestion);