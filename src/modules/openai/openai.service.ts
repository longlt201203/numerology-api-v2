import { Inject, Injectable } from "@nestjs/common";
import { Env } from "@utils";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

@Injectable()
export class OpenAIService {
    constructor(
        @Inject("OPEN_AI")
        private readonly openai: OpenAI
    ) {}

    createChatCompletions(messages: ChatCompletionMessageParam[]) {
        return this.openai.chat.completions.create({
            model: Env.OPEN_AI_CHAT_MODEL,
            messages: messages,
        });
    }

    createChatCompletionsStream(messages: ChatCompletionMessageParam[]) {
        return this.openai.chat.completions.create({
            model: Env.OPEN_AI_CHAT_MODEL,
            messages: messages,
            stream: true
        });
    }
}