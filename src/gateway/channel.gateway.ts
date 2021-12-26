import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';

@WebSocketGateway()
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server:Server;
  private logger:Logger = new Logger('ChannelGateway');

  @SubscribeMessage('msgFromClientToServer')
  handleMessage(client : Socket,payload:string): void{
    this.server.emit('msgFromServerToClient',`${client.id} sent ${payload}`);
  }

  afterInit(server: Server) {
      this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client Connected : ${client.id}`)
  }

  handleDisconnect(client: Socket) {
      this.logger.log(`Client Disconnected : ${client.id}`)
  }
}