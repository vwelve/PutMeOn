import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueService } from './queue.service';
import { Queue, QueueSchema } from './schemas/queue.scehma';

@Module({
  imports: [MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }])],
  providers: [QueueService]
})
export class QueueModule {}
