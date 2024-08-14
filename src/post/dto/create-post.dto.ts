import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ type: String, description: 'Post title' })
    @IsNotEmpty({ message: 'title is required', context: { errorCode: 400 } })
    readonly title: string;

    @ApiProperty({ type: String, description: 'Post content' })
    @IsNotEmpty({ message: 'Content is required', context: { errorCode: 400 } })
    readonly content: string;
}
