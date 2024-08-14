import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEventDto {
    @ApiProperty({ type: String, description: 'Event Name' })
    @IsNotEmpty({ message: 'Name is required', context: { errorCode: 400 } })
    readonly name: string;

    @ApiProperty({ type: String, description: 'Object Id' })
    @IsNotEmpty({ message: 'ObjectId is required', context: { errorCode: 400 } })
    readonly objectId: string;
}
