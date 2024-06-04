import OpenAI from "openai";
import { OpenAIService } from "./openai.service";
import { Module } from "@nestjs/common";
import { Env } from "@utils";

@Module({
    providers: [
        {
            provide: "OPEN_AI",
            useValue: new OpenAI({ apiKey: Env.OPEN_AI_API_KEY })
        },
        OpenAIService
    ],
    exports: [OpenAIService]
})
export class OpenAIModule {}