import { ApiResponseDto } from "@utils";
import { NumerologyService } from "./numerology.service";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnalyzeRequestDto } from "./dto";

@Controller("numerology")
@ApiTags("numerology")
export class NumerologyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @Post("analyze")
    async analyze(@Body() dto: AnalyzeRequestDto) {
        const data = await this.numerologyService.analyze(dto);
        return new ApiResponseDto(data);
    }
}