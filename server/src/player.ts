import * as WebSocket from 'ws';

import {
  Point2d,
  Random,
} from './';

export class Player {

  private connection: WebSocket;
  public name: string;
  public position: Point2d;
  public stats: PlayerStats;

  constructor(connection: WebSocket) {
    this.connection = connection;
    this.name = 'Jim';
    this.stats = {
      maxHitpoints: 2000,
      hitpoints: 2000,
      attackRange: 96,
      attackSpeed: 1.25,
      accuracy: 326,
      armor: 315,
      maxDamage: 315,
      minDamageMultiplier: .9,
      walkSpeed: 75
    };
    this.position = new Point2d(800 / 2, 600 / 2);
  }

  public toString = (): string => {
    let data = {
      name: this.name,
      position: this.position,
      stats: this.stats,
    };
    return JSON.stringify(data);
  }
}

export interface PlayerStats {
  maxHitpoints: number;
  hitpoints: number;
  attackRange: number;
  attackSpeed: number;
  accuracy: number;
  armor: number;
  maxDamage: number;
  minDamageMultiplier: number;
  walkSpeed: number;
}
