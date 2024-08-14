import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebhookSubscriptionService } from './webhook-subscription.service';
import { CreateWebhookSubscriptionDto } from './dto/create-webhook-subscription.dto';
import { UpdateWebhookSubscriptionDto } from './dto/update-webhook-subscription.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('webhook-subscriptions')
@Controller('webhook-subscriptions')
export class WebhookSubscriptionController {
  constructor(private readonly webhookSubscriptionService: WebhookSubscriptionService) {}

  @Post()
  create(@Body() createWebhookSubscriptionDto: CreateWebhookSubscriptionDto) {
    return this.webhookSubscriptionService.create(createWebhookSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.webhookSubscriptionService.findAll();
  }

  @Get(':webhookSubscriptionId')
  findOne(@Param('webhookSubscriptionId') webhookSubscriptionId: string) {
    return this.webhookSubscriptionService.findOne(webhookSubscriptionId);
  }

  @Patch(':webhookSubscriptionId')
  update(@Param('webhookSubscriptionId') webhookSubscriptionId: string, @Body() updateWebhookSubscriptionDto: UpdateWebhookSubscriptionDto) {
    return this.webhookSubscriptionService.update(webhookSubscriptionId, updateWebhookSubscriptionDto);
  }

  @Delete(':webhookSubscriptionId')
  remove(@Param('webhookSubscriptionId') webhookSubscriptionId: string) {
    return this.webhookSubscriptionService.remove(webhookSubscriptionId);
  }
}
