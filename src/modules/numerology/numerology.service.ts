import { AnalyzeRequestDto } from "@modules/numerology/dto";
import { OpenAIService } from "@modules/openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NumerologyService {
    private static NUMEROLOGY_READING_SYSTEM_MESSAGE = "You are an Pythagorean Numerology expert. You will be provide an person's name, birthday, and country. Please provide the numerology analysis of that person. Your output must be in plain text.";

    constructor(
        private readonly openaiService: OpenAIService
    ) {}

    async analyze(dto: AnalyzeRequestDto) {
        const res = await this.openaiService.createChatCompletions([
            { role: "system", content: NumerologyService.NUMEROLOGY_READING_SYSTEM_MESSAGE },
            {
                role: "user", content: [
                    { type: "text", text: `Full name: ${dto.fullName}` },
                    { type: "text", text: `Birthday: ${new Date(dto.dob)}` },
                    { type: "text", text: `Country: ${dto.country}` },
                ]
            }
        ]);
        return res.choices[0].message.content;
    }
}