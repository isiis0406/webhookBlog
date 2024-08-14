import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateWebhookSubscriptionDto {
    @ApiProperty({ type: String, description: 'Subscription Url' })
    @IsNotEmpty({ message: 'Url is required', context: { errorCode: 400 } })
    readonly url: string;

    @ApiProperty({ type: String, description: 'Event Id' })
    @IsNotEmpty({ message: 'EventId is required', context: { errorCode: 400 } })
    readonly eventId: string;
    
}
