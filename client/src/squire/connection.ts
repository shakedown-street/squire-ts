export class Connection {

  public socket: any;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('Connection started');
    };
    this.socket.onmessage = (message: any) => {
      console.log(message);
    };
    this.socket.onclose = () => {
      console.log('Connection closed');
    };
  }
}
