import { RequestBatchFlowDto } from 'src/message-queue/dtos/request-batch-flow.dto';

export interface MessageQueue {
  addBatchFlowJob(dto: RequestBatchFlowDto): boolean | PromiseLike<boolean>;
  addJob: (data: any) => Promise<string>;
}
