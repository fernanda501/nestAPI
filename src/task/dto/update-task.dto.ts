import { IsOptional, IsString } from "class-validator";
import { Length } from "class-validator";
export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @Length(3, 20)
    title?: string;
    @IsOptional()
    @IsString()
    description?: string;
}