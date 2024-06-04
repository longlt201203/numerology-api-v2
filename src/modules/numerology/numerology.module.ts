import { NumerologyService } from "./numerology.service";
import { NumerologyController } from "./numerology.controller";
import { Module } from "@nestjs/common";
import { OpenAIModule } from "@modules/openai";

@Module({
    controllers: [NumerologyController],
    providers: [NumerologyService],
    imports: [OpenAIModule]
})
export class NumerologyModule {}