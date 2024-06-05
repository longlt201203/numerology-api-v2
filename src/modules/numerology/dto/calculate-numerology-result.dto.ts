import { ApiProperty } from "@nestjs/swagger";

export class CalculateNumerologyResultDto {
    @ApiProperty()
    lifePath: number;

    @ApiProperty()
    soulUrge: number;

    @ApiProperty()
    expression: number;

    @ApiProperty()
    personality: number;

    @ApiProperty()
    birthday: number;

    @ApiProperty()
    maturity: number;

    // @ApiProperty()
    // personalYearNumber: number;

    // @ApiProperty()
    // personalMonthNumber: number;

    @ApiProperty()
    balance: number;

    @ApiProperty({ type: Number, isArray: true })
    challenge: number[];

    @ApiProperty({ type: Number, isArray: true })
    pinnacle: number[];

    @ApiProperty({ type: Number, isArray: true })
    hiddenPassion: number[];

    @ApiProperty()
    cornerstone: number;

    @ApiProperty()
    capstone: number;

    @ApiProperty()
    firstVowel: number;
}