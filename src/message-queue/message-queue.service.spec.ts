import { Test, TestingModule } from '@nestjs/testing';
import { MessageQueueService } from './message-queue.service';
import { MessageQueueSqsService } from './message-queue-sqs/message-queue-sqs.service';

describe('MessageQueueService', () => {
  let service: MessageQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'MessageQueue',
          useClass: MessageQueueSqsService, // MessageQueueSqsService, MessageQueueBullMqService로 둘중하나를 선택해서 배포가 가능하다.
        },
        MessageQueueService,
      ],
    }).compile();

    service = module.get<MessageQueueService>(MessageQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
