import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AccessTokenDocument = AccessToken & Document;

@Schema({ timestamps: true })
export class AccessToken {
    @Prop()
    readonly _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    readonly user: User;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop({ default: 3600 })
    readonly expiresIn: number;

    @Prop()
    readonly createdAt: Date;

    @Prop()
    readonly updatedAt: Date;
}

export const AccessTokensSchema = SchemaFactory.createForClass(AccessToken);