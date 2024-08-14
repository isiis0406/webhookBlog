import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookSubscriptionService } from 'src/webhook-subscription/webhook-subscription.service';
import { ObjectService } from 'src/object/object.service';
import { EventService } from 'src/event/event.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, WebhookSubscriptionService, ObjectService, EventService],
})
export class PostModule {}
