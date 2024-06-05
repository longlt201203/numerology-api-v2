import { NumerologyService } from "./numerology.service";
import { NumerologyController } from "./numerology.controller";
import { Module } from "@nestjs/common";
import { OpenAIModule } from "@modules/openai";
import { NumerologyGateway } from "./numerology.gateway";

@Module({
    controllers: [NumerologyController],
    providers: [NumerologyService, NumerologyGateway],
    imports: [OpenAIModule]
})
export class NumerologyModule {}