import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ _id: true })
    _id: string;

    @Prop()
    display_name: string;

    @Prop(raw({
        height: { type: Number, required: false  },
        url: { type: String },
        width: { type: Number, required: false  }
    }))
    images: Record<string, string | number>[];

    @Prop(raw({
        spotify: { type: String, required: true }
    }))
    external_urls: Record<string, string>;
}

export const UsersSchema = SchemaFactory.createForClass(User);