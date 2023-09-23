import { Test, TestingModule } from '@nestjs/testing';
import { MessageQueueSqsService } from './message-queue-sqs.service';

describe('MessageQueueSqsService', () => {
  let service: MessageQueueSqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageQueueSqsService],
    }).compile();

    service = module.get<MessageQueueSqsService>(MessageQueueSqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
