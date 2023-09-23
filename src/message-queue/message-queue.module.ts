import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullModule as BullMQModule } from '@nestjs/bullmq';
import { InvoiceConsumer } from './consumers/invoice.consumers';

import { MessageQueueConfig } from './config/message-queue.config';
import { MessageQueueSqsService } from './message-queue-sqs/message-queue-sqs.service';
import { MessageQueueService } from './message-queue.service';
import { ConfigModule } from '@nestjs/config';
import messageQueueConfig from '@config/messageQueue';
import { MessageQueueBullMqService } from './message-queue-bull-mq/message-queue-bull-mq.service';
import { BatchImportExcelProcessor } from './consumers/batch-import-excel.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [messageQueueConfig],
    }),
    BullModule.forRootAsync(MessageQueueConfig.CONFIG_KEY, {
      useClass: MessageQueueConfig,
    }),
    BullModule.registerQueueAsync({
      configKey: MessageQueueConfig.CONFIG_KEY,
      name: MessageQueueConfig.BATCH_QUEUE_NAME,
    }),
    BullMQModule.forRoot({
      connection: {
        host: 'localhost',
        port: 46379,
      },
    }),
    BullMQModule.registerFlowProducer({
      name: 'batch-import-excel-process',
    }),
  ],
  providers: [
    {
      provide: 'MessageQueue',
      useClass: MessageQueueBullMqService, // MessageQueueSqsService, MessageQueueBullMqService로 둘중하나를 선택해서 배포가 가능하다.
    },
    MessageQueueService,
    InvoiceConsumer,
    BatchImportExcelProcessor,
  ],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
