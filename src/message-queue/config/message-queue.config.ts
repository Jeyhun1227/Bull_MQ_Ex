import { Injectable } from '@nestjs/common';
import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MessageQueueConfig implements SharedBullConfigurationFactory {
  static CONFIG_KEY = 'bull-config';
  static BATCH_QUEUE_NAME = 'batch';
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration():
    | BullRootModuleOptions
    | Promise<BullRootModuleOptions> {
    return {
      redis: {
        host: this.configService.get('messageQueue.host'),
        port: this.configService.get('messageQueue.port'),
      },
    };
  }
}
