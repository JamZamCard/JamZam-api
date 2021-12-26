import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'events' })
export class ChannelGateway {
  @SubscribeMessage('events')
  handleMessage(@MessageBody() data:string): string {
    return data;
  }
}
