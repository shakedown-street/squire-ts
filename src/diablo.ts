import { sortBy as _sortBy } from 'lodash';

import {
  Connection,
  Event,
  Point2d,
  Random,
  Renderer,
  State,
  SquireGame,
} from './squire';

import {
  Entity,
  Player,
  CoinsAnim,
  CoinsGroundItem,
  HeavyArmorGroundItem,
  GroundItem,
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
  private frameSprite: any;
  private terrainSprite: any;
  private cursors: any;
  private entities: Entity[] = [];
  private groundItems: GroundItem[] = [];

  private mouseDownEvent: any;
  private mouseUpEvent: any;
  private mouseMoveEvent: any;

  constructor(gameCtx: any) {
    super(gameCtx);
    this.mouseDownEvent = this.mouseDown.bind(this);
    this.mouseUpEvent = this.mouseUp.bind(this);
    this.mouseMoveEvent = this.mouseMove.bind(this);
    this.connection = new Connection('ws://localhost:443');
    this.player = new Player(this.connection, new Point2d(400, 300));
    this.entities.push(new BlackKnightEntity(new Point2d(200, 150)));
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
    this.gameCtx.canvas.addEventListener('mousedown', this.mouseDownEvent, false);
    this.gameCtx.canvas.addEventListener('click', (canvasEvent: any) => {
      let offsetX, offsetY = 0;
      let element = this.gameCtx.canvas;
      offsetX = this.gameCtx.canvas.offsetLeft;
      offsetY = this.gameCtx.canvas.offsetTop;
      let actualClickX = canvasEvent.clientX - offsetX;
      let actualClickY = canvasEvent.clientY - offsetY;
    }, false);
    let attackEvent = new AttackKeyEvent(1);
    let powerUpEvent = new PowerUpKeyEvent(2);
    window.addEventListener('keydown', (canvasEvent: any) => {
      // this.keys.onKeydown(canvasEvent);
    }, false);
    window.addEventListener('keyup', (canvasEvent: any) => {
      // this.keys.onKeyup(canvasEvent);
      switch (canvasEvent.keyCode) {
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

  public mouseDown(e: any) {
    window.addEventListener('mousemove', this.mouseMoveEvent, false);
    this.gameCtx.canvas.removeEventListener('mousedown', this.mouseDownEvent, false);
    window.addEventListener('mouseup', this.mouseUpEvent, false);
    if (e.preventDefault) {
      e.preventDefault();
    } else if (e.returnValue) {
      e.returnValue = false;
    }
    return false;
  }

  public mouseUp(e: any) {
    this.gameCtx.canvas.addEventListener('mousedown', this.mouseDownEvent, false);
    window.removeEventListener('mouseup', this.mouseUpEvent, false);
    window.removeEventListener('mousemove', this.mouseMoveEvent, false);
    let element = this.gameCtx.canvas;
    let offsetX = this.gameCtx.canvas.offsetLeft;
    let offsetY = this.gameCtx.canvas.offsetTop;
    let clickX = e.clientX - offsetX;
    let clickY = e.clientY - offsetY;
    this.player.walkTo = new Point2d(clickX, clickY);
  }

  public mouseMove(e: any) {
    let element = this.gameCtx.canvas;
    let offsetX = this.gameCtx.canvas.offsetLeft;
    let offsetY = this.gameCtx.canvas.offsetTop;
    let clickX = e.clientX - offsetX;
    let clickY = e.clientY - offsetY;
    this.player.walkTo = new Point2d(clickX, clickY);
  }

  public render(r: Renderer) {
    r.image(this.terrainSprite, 0, 0, 910, 610, 0, 0, 910, 610);
    let toSort = this.entities.concat(this.player);
    let sortedEntites = _sortBy(toSort, (obj) => {
      if (obj.isDead()) {
        return 0;
      }
      return -obj.pos.x;
    });
    this.groundItems.forEach((item) => {
      item.renderAnim(r);
    });
    sortedEntites.reverse().forEach((entity: any) => {
      entity.render(r);
    });
    // r.image(this.cursors, 288, 0, 33, 29, this.mouse.x, this.mouse.y, 33, 29);
  }

  public update(dt: number) {
    this.player.update(dt, this.entities);
    this.entities.forEach((e) => {
      e.setTarget(this.player);
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
