import * as fs from 'fs';
import * as WebSocket from 'ws';

import {
  Player
} from './';

export class GameServer {

  private socket = new WebSocket.Server({ port: 443 });
  private players: Player[] = [];

  constructor() {}

  public start() {
    this.socket.on('listening', (event: any) => {
      console.log('Server started');
    });
    this.socket.on('connection', (socket, request) => {
      let player = new Player(socket);
      this.players.push(player);
      socket.send(JSON.stringify({
        type: 'player',
        data: player.toString()
      }));
    });
    this.socket.on('message', (event: any) => {
      console.log(event);
    });
    this.socket.on('error', (error: any) => {
      console.log(error);
    });
  }

  public broadcast(data: any) {
    this.socket.clients.forEach((client: WebSocket) => {
      client.send(data);
    });
  }
}

let gameServer = new GameServer();
gameServer.start();
