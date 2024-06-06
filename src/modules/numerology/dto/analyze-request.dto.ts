import { CalculateNumerologyDto } from "./calculate-numerology.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Language } from "@utils";
import { IsEnum } from "class-validator";

export class AnalyzeRequestDto extends CalculateNumerologyDto {
    @ApiProperty()
    @IsEnum(Language)
    lang: Language;
}