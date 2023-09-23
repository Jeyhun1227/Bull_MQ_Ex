import { Injectable } from '@nestjs/common';
import { MessageQueue } from '../message-queue.interface';
import { RequestBatchFlowDto } from 'src/message-queue/dtos/request-batch-flow.dto';

@Injectable()
export class MessageQueueSqsService implements MessageQueue {
  addBatchFlowJob(dto: RequestBatchFlowDto): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.');
  }
  async addJob(data: any) {
    return Promise.resolve('for AWS SQS Service');
  }
}
