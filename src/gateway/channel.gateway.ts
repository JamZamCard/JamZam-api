import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/channel', cors: true })
export class ChannelGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChannelGateway');

  @SubscribeMessage('msgFromClientToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; code: string; text: string },
  ): void {
    this.server.to(message.code).emit('msgFromServerToClient', message);
  }

  @SubscribeMessage('joinChannel')
  handleJoinChannel(
    client: Socket,
    data: { code: string; username: string },
  ): void {
    client.join(data.code);
    this.server.to(data.code).emit('hasJoinChannel', data);
  }

  @SubscribeMessage('leaveChannel')
  handleLeaveChannel(client: Socket, code: string): void {
    client.leave(code);
    client.emit('leftChannel', code);
  }

  afterInit() {
    this.logger.log('Init');
  }
}
