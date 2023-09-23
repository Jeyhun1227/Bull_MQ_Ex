import { registerAs } from '@nestjs/config';

const messageQueueConfig = registerAs('messageQueue', () => ({
  host: process.env.MESSAGE_QUEUE_HOST,
  port: +process.env.MESSAGE_QUEUE_PORT,
}));

export default messageQueueConfig;
