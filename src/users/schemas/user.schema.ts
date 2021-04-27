import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ unique: true })
    readonly userId: string;

    @Prop()
    readonly profileHref: string;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop({ default: 3600 })
    expiresIn: number;

    @Prop()
    readonly createdAt: Date

    @Prop()
    readonly updatedAt: Date
}

export const UsersSchema = SchemaFactory.createForClass(User);