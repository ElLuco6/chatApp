import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() payload: [pseudo: string, body: string, channel: string]
  ): void {
    this.server.emit("message" + "." + payload[2], payload);
  }
}
