import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    display_name: string;

    @Prop(raw({
        spotify: { type: String }
    }))
    external_urls: Record<string, string>;

    @Prop()
    href: string;

    @Prop()
    id: string;

    @Prop(raw({
        height: { type: Number, required: false  },
        url: { type: String },
        width: { type: Number, required: false  }
    }))
    images: Record<string, string | number>[];

    @Prop()
    type: string;

    @Prop()
    uri: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);