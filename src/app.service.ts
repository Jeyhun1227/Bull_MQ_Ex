import { Inject, Injectable } from '@nestjs/common';
import { MessageQueue } from './message-queue/message-queue.interface';
import { MessageQueueService } from './message-queue/message-queue.service';
import { RequestBatchFlowDto } from './message-queue/dtos/request-batch-flow.dto';

@Injectable()
export class AppService {
  constructor(private readonly messageQueueService: MessageQueueService) {}

  createJob(): Promise<string> {
    return this.messageQueueService.addJob({ name: 'John Doe' });
  }

  async createBatchFlow(dto: RequestBatchFlowDto): Promise<boolean> {
    return this.messageQueueService.addBatchFlowJob(dto);
    return true;
  }
}
