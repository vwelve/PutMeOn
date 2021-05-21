import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    readonly _id: mongoose.Schema.Types.ObjectId;

    @Prop({ unique: true })
    readonly userId: string;

    @Prop()
    profileUrl: string;

    @Prop({ default: null })
    image: string;

    @Prop()
    displayName: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);