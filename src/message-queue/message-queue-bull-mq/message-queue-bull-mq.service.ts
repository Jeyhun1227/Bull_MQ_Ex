import { Injectable } from '@nestjs/common';
import { MessageQueue } from '../message-queue.interface';
import { MessageQueueConfig } from '../config/message-queue.config';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { RequestBatchFlowDto } from 'src/message-queue/dtos/request-batch-flow.dto';
import { FlowProducer } from 'bullmq';
import { randomUUID } from 'crypto';
import { InjectFlowProducer } from '@nestjs/bullmq';
@Injectable()
export class MessageQueueBullMqService implements MessageQueue {
  constructor(
    @InjectQueue(MessageQueueConfig.BATCH_QUEUE_NAME) private batchQueue: Queue,
    @InjectFlowProducer('batch-import-excel-process')
    private flowProducer: FlowProducer,
  ) {}

  async addJob(data: any) {
    const job = this.batchQueue.add('invoice-excel', data);
    return (await job).name;
  }
  async addBatchFlowJob(dto: RequestBatchFlowDto): Promise<boolean> {
    const name = randomUUID();
    const flow = await this.flowProducer.add({
      name,
      children: [
        {
          name: `${name}-validate`,
          queueName: 'batch-import-excel-validate',
          data: dto,
        },
        {
          name: `${name}-apply`,
          queueName: 'batch-import-excel-apply',
          data: dto,
        },
      ],
      queueName: MessageQueueConfig.BATCH_QUEUE_NAME,
    });

    return true;
  }
}
