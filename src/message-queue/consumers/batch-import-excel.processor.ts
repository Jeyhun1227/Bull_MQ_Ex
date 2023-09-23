import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('batch-import-excel-process')
export class BatchImportExcelProcessor extends WorkerHost {
  process(job: Job<any, any, string>, token?: string): Promise<any> {
    console.log(job, token);
    return Promise.resolve();
  }
}
