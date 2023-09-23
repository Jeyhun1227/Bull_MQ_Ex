import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestBatchFlowDto } from './message-queue/dtos/request-batch-flow.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('job')
  async createJob(): Promise<string> {
    return await this.appService.createJob();
  }

  @Post('batch-flow')
  createBatchFlow(@Body() dto: RequestBatchFlowDto): Promise<boolean> {
    return this.appService.createBatchFlow(dto);
  }
}
