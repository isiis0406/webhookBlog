import { Module } from '@nestjs/common';
import { WebhookSubscriptionService } from './webhook-subscription.service';
import { WebhookSubscriptionController } from './webhook-subscription.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WebhookSubscriptionController],
  providers: [WebhookSubscriptionService, PrismaService],
})
export class WebhookSubscriptionModule {}
