import { ApiProperty } from "@nestjs/swagger";
import { Language } from "@utils";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class AnalyzeRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lsName: string;

    @ApiProperty()
    @IsDateString()
    dob: string;

    @ApiProperty()
    @IsEnum(Language)
    lang: Language;
}