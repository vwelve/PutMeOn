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
    readonly profileHref: string;

    @Prop({ default: null })
    readonly image: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);