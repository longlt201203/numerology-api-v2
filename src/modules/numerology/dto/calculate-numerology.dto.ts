import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CalculateNumerologyDto {
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
}