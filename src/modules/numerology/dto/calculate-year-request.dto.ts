import { ApiProperty } from "@nestjs/swagger";
import { Language } from "@utils";
import { IsDateString, IsEnum, IsNumber, Max, Min } from "class-validator";

export class CalculateYearRequestDto {
    @ApiProperty()
    @IsDateString()
    dob: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(2200)
    year: number;

    @ApiProperty()
    @IsEnum(Language)
    lang: Language;
}