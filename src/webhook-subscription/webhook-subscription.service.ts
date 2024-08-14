import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWebhookSubscriptionDto } from './dto/create-webhook-subscription.dto';
import { UpdateWebhookSubscriptionDto } from './dto/update-webhook-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookSubscriptionService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async create(createWebhookSubscriptionDto: CreateWebhookSubscriptionDto) {
   return await this.prismaService.webhookSubscription.create({
      data: createWebhookSubscriptionDto,
      include: { event: true },
    });
  }

  async findAll() {
    return await this.prismaService.webhookSubscription.findMany({
      include: { event: true },
    });
  }

  async findOne(webhookSubscriptionId: string) {
    const wbhSubscription = await this.prismaService.webhookSubscription.findUnique({
      where: { webhookSubscriptionId },
      include: { event: true },
    });

    if (!wbhSubscription) {
      throw new NotFoundException(`Webhook subscription with ID ${webhookSubscriptionId} not found`);
    }

    return wbhSubscription;
  }

  async findSubscriptionsByEventId( eventId: string) {
    return await this.prismaService.webhookSubscription.findMany({
      where: { eventId },
      include: { event: true },
    });

  }
  async update(webhookSubscriptionId: string, updateWebhookSubscriptionDto: UpdateWebhookSubscriptionDto) {
    const wbhSubscription = await this.prismaService.webhookSubscription.findUnique({
      where: { webhookSubscriptionId },
      include: { event: true },
    });

    if (!wbhSubscription) {
      throw new NotFoundException(`Webhook subscription with ID ${webhookSubscriptionId} not found`);
    }

    return await this.prismaService.webhookSubscription.update({
      where: { webhookSubscriptionId },
      data: updateWebhookSubscriptionDto,
      include: { event: true },
    });
  }

  async remove(webhookSubscriptionId: string) {
    const wbhSubscription = await this.prismaService.webhookSubscription.findUnique({
      where: { webhookSubscriptionId },
      include: { event: true },
    });

    if (!wbhSubscription) {
      throw new NotFoundException(`Webhook subscription with ID ${webhookSubscriptionId} not found`);
    }

    return await this.prismaService.webhookSubscription.delete({
      where: { webhookSubscriptionId },
      include: { event: true  },
    });
  }
}
