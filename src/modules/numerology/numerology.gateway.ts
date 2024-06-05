import { MySocketExceptionFilter, SocketEvents, ValidationPipe } from "@utils";
import { AnalyzeRequestDto } from "./dto";
import { NumerologyService } from "./numerology.service";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { UseFilters, UsePipes } from "@nestjs/common";

@WebSocketGateway(8888, { cors: { origin: "*" } })
@UseFilters(MySocketExceptionFilter)
@UsePipes(ValidationPipe)
export class NumerologyGateway {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @SubscribeMessage(SocketEvents.ANALYZE)
    analyze(
        @ConnectedSocket() client: Socket,
        @MessageBody() dto: AnalyzeRequestDto
    ) {
        this.numerologyService.analyzeStream(dto, (chunk) => {
            client.emit(SocketEvents.ANALYZING, chunk);
        }, () => {
            client.emit(SocketEvents.END_STREAM);
        })
    }
}