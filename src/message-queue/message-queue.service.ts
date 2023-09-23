import { Inject, Injectable } from '@nestjs/common';
import { MessageQueue } from './message-queue.interface';
import { RequestBatchFlowDto } from 'src/message-queue/dtos/request-batch-flow.dto';

@Injectable()
export class MessageQueueService implements MessageQueue {
  constructor(
    @Inject('MessageQueue')
    private readonly messageQueue: MessageQueue,
  ) {}

  addJob(data: any): Promise<string> {
    return this.messageQueue.addJob(data);
  }
  addBatchFlowJob(dto: RequestBatchFlowDto): boolean | PromiseLike<boolean> {
    return this.messageQueue.addBatchFlowJob(dto);
  }
}
