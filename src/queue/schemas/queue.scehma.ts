import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import ISong from 'src/common/interfaces/song.interface';
import { User } from 'src/users/schemas/user.schema';

export type QueueDocument = Queue & Document;

@Schema({ timestamps: true })
export class Queue {
    @Prop()
    readonly _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    readonly song: ISong;    

    @Prop()
    readonly createdAt: Date;

    @Prop()
    readonly updatedAt: Date;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);