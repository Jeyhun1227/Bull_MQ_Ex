import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageQueueModule } from './message-queue/message-queue.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `${__dirname}/config/env/.${process.env.NODE_ENV ?? 'local'}.env`,
      ],
      validationSchema,
    }),
    MessageQueueModule,
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
