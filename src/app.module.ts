import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ObjectModule } from './object/object.module';
import { EventModule } from './event/event.module';
import { PrismaService } from './prisma/prisma.service';
import { WebhookSubscriptionModule } from './webhook-subscription/webhook-subscription.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ObjectModule,
    EventModule,
    WebhookSubscriptionModule,
    PostModule,

  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }