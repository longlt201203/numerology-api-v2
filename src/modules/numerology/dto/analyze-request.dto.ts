import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class AnalyzeRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty()
    @IsDateString()
    dob: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;
}