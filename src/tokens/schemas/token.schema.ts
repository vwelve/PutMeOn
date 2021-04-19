import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TokenDocument = Token & Document;

@Schema({ timestamps: true })
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    user: User;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop()
    expiresIn: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const TokensSchema = SchemaFactory.createForClass(Token);