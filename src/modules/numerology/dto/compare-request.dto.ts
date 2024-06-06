import { CalculateNumerologyDto } from "./calculate-numerology.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Language } from "@utils";
import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";

export class CompareRequestDto {
    @ApiProperty({ type: CalculateNumerologyDto, isArray: true })
    @Type(() => CalculateNumerologyDto)
    @ValidateNested({ each: true })
    list: CalculateNumerologyDto[];

    @ApiProperty()
    @IsEnum(Language)
    lang: Language;
}