import { sortBy as _sortBy } from 'lodash';

import {
  Connection,
  Dimension2d,
  Event,
  Keys,
  Point2d,
  Random,
  Renderer,
  State,
  SquireGame,
} from './squire';

import {
  Entity,
  Player,
  BlackKnightEntity,
  HeavyArmorSwordShieldEntity,
} from './';


export class AttackKeyEvent extends Event {
  public handleEvent(event: any, stateCtx: GameState) {
    stateCtx.player.switchAnim('attack');
  }
}

export class PowerUpKeyEvent extends Event {
  public handleEvent(event: any, stateCtx: GameState) {
    stateCtx.player.switchAnim('magic_lightning');
  }
}

export class Diablo extends SquireGame {

  private gameState: GameState;

  constructor() {
    super('diablo');
    this.gameState = new GameState(this);
    this.stateManager.state = this.gameState;
  }
}

class GameState extends State {

  public connection: Connection;
  private mouse: Point2d = new Point2d(0, 0);
  public player: Player;
  public keys = new Keys();
  private frameSprite: any;
  private terrainSprite: any;
  private cursors: any;
  private entities: Entity[];
  private groundItems: any[];

  constructor(gameCtx: any) {
    super(gameCtx);
    this.connection = new Connection('ws://localhost:8080');
    this.player = new Player(this.connection, new Point2d(64, 100));
    this.entities = [new BlackKnightEntity(new Point2d(600, 400))];
    this.gameCtx.canvas.addEventListener('mousemove', (canvasEvent: any) => {
      let offsetX, offsetY = 0;
      let element = this.gameCtx.canvas;
      offsetX = this.gameCtx.canvas.offsetLeft;
      offsetY = this.gameCtx.canvas.offsetTop;

      this.mouse = new Point2d(
        canvasEvent.clientX - offsetX,
        canvasEvent.clientY - offsetY
      );
    }, false);
    this.gameCtx.canvas.addEventListener('click', (canvasEvent: any) => {
      let offsetX, offsetY = 0;
      let element = this.gameCtx.canvas;
      offsetX = this.gameCtx.canvas.offsetLeft;
      offsetY = this.gameCtx.canvas.offsetTop;

      this.player.walkTo = new Point2d(
        canvasEvent.clientX - offsetX,
        canvasEvent.clientY - offsetY
      );
    }, false);
    let attackEvent = new AttackKeyEvent(1);
    let powerUpEvent = new PowerUpKeyEvent(2);
    window.addEventListener('keydown', (canvasEvent: any) => {
      this.keys.onKeydown(canvasEvent);
    }, false);
    window.addEventListener('keyup', (canvasEvent: any) => {
      this.keys.onKeyup(canvasEvent);
      switch(canvasEvent.keyCode) {
        case 32:
          attackEvent.handleEvent(canvasEvent, this);
        break;
        case 49:
          powerUpEvent.handleEvent(canvasEvent, this);
        break;
      }
    }, false);
    this.terrainSprite = new Image();
    this.terrainSprite.onload = () => {
      console.log('Image loaded: ' + 'assets/terrain.png')
    };
    this.terrainSprite.src = 'assets/terrain.png';
    // this.cursors = new Image();
    // this.cursors.onload = () => {
    //   console.log('Image loaded: ' + 'assets/cursors.png')
    // };
    // this.cursors.src = 'assets/cursors.png';
  }

  public init() { }

  public render(r: Renderer) {
    r.image(this.terrainSprite, 0, 0, 910, 610, 0, 0, 800, 600);
    let toSort = this.entities.concat(this.player);
    let sortedEntites = _sortBy(toSort, (obj) => {
      if (obj.isDead()) {
        return 0;
      }
      return -obj.pos.x;
    });
    sortedEntites.reverse().forEach((entity: any) => {
      entity.render(r);
    });
    // r.image(this.cursors, 288, 0, 33, 29, this.mouse.x, this.mouse.y, 33, 29);
  }

  public update(dt: number) {
    this.player.setTarget(this.entities.filter((e: any) => !e.isDead())[0]);
    this.player.update(dt, this.entities);
    this.entities.forEach((e) => {
      e.setTarget(this.player);
      e.walkTo = e.target.pos;
      e.update(dt, this.entities);
    });
  }

  public end() {

  }
}

window.onload = () => {
  let diablo = new Diablo();
  diablo.run();
}
