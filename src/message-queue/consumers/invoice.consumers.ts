import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('batch')
export class InvoiceConsumer {
  @Process('invoice-excel')
  invoiceExcel(job: Job) {
    console.log('invoice-excel', job.data);
  }
}
