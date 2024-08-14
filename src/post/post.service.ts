import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { WebhookSubscriptionService } from 'src/webhook-subscription/webhook-subscription.service';
import { ObjectService } from 'src/object/object.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventService } from 'src/event/event.service';
import axios from 'axios';

@Injectable()
export class PostService {
  constructor(
    private objectService: ObjectService,
    private webhookService: WebhookSubscriptionService,
    private prismaService: PrismaService,
    private eventService: EventService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: createPostDto
    });
    await this.triggerWebhooks('post.created', post);
    return post;
  }

  async findAll() {
    return `This action returns all post`;
  }

  async findOne(postId: string) {
  }

  async update(postId: string, updatePostDto: UpdatePostDto) {
  }

  async remove(postId: string) {
  }
  private async triggerWebhooks(eventName: string, data: any) {
    const event = await this.eventService.findByName(eventName);
    if (event) {
      const subscriptions = await this.webhookService.findSubscriptionsByEventId(event.eventId);
      console.log(subscriptions);
      
      for (const subscription of subscriptions) {
        await axios.post(subscription.url, data).catch((err) => {
          console.error(`Failed to send webhook to ${subscription.url}:`, err.message);
          // Optionally, you can deactivate the subscription if it fails
          // this.webhookService.deactivateSubscription(subscription.id);
        });
      }
    }
  }
}
