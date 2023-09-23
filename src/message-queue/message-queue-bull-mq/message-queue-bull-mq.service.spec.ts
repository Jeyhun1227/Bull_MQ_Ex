import { Test, TestingModule } from '@nestjs/testing';
import { MessageQueueBullMqService } from './message-queue-bull-mq.service';
import { BullModule, InjectQueue, getQueueToken } from '@nestjs/bull';
import { MessageQueueConfig } from '../config/message-queue.config';
import { ConfigModule } from '@nestjs/config';
import messageQueueConfig from '@config/messageQueue';
import { Queue } from 'bull';

describe('MessageQueueBullMqService', () => {
  let service: MessageQueueBullMqService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageQueueBullMqService],
      imports: [
        BullModule.registerQueue({
          name: MessageQueueConfig.BATCH_QUEUE_NAME,
        }),
      ],
    })
      .overrideProvider(getQueueToken(MessageQueueConfig.BATCH_QUEUE_NAME))
      .useValue({
        add: jest.fn().mockImplementation((data: any) => 'job created'),
      })
      .compile();

    service = module.get<MessageQueueBullMqService>(MessageQueueBullMqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addJob', () => {
    it('should job add to queue', async () => {
      const job = await service.addJob('test-job');
      expect(job).not.toBeNull();
    }, 5000);
  });
});
