import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateObjectDto {
    @ApiProperty({ type: String, description: 'Object Name' })
    @IsNotEmpty({ message: 'Name is required', context: { errorCode: 400 } })
    readonly name: string;
}
