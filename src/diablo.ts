import {
  Dimension2d,
  Event,
  Point2d,
  Renderer,
  State,
  SquireGame,
} from './squire';

import {
  Entity,
  Hero,
} from './';

export class Diablo extends SquireGame {

  public chatboxLines: any[] = [];
  private gameState: GameState;

  constructor() {
    super('diablo');
    this.gameState = new GameState(this);
    this.stateManager.state = this.gameState;
  }
}

class AttackClickEvent extends Event {

  public handleEvent(event: any, stateCtx: any) {
    stateCtx.hero.switchAnim('attack');
  }
}

class Keys {

  private _pressed: any = {};

  public LEFT = 65;
  public UP = 87;
  public RIGHT = 68;
  public DOWN = 83;

  public isDown(keyCode: number) {
    return this._pressed[keyCode];
  }

  public onKeydown(event: any) {
    this._pressed[event.keyCode] = true;
  }

  public onKeyup(event: any) {
    delete this._pressed[event.keyCode];
  }
}

class GameState extends State {

  private mouse: Point2d;
  public hero: Hero;
  private keys: Keys = new Keys();

  constructor(gameCtx: any) {
    super(gameCtx);
    this.hero = new Hero(new Point2d(400, 150));
    // this.eventManager.clickEvents.push(new AttackClickEvent(1));
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
    window.addEventListener('keydown', (event: any) => { this.keys.onKeydown(event); }, false);
    window.addEventListener('keyup', (even: any) => { this.keys.onKeyup(event); }, false);
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public init() {
    this.gameCtx.chatboxLines.push(
      {
        'color': 'black',
        'message': 'Welcome to Diablo'
      },
      {
        'color': 'red',
        'message': '111111111111111111111'
      },
      {
        'color': 'orange',
        'message': '2222222222222222222222'
      },
      {
        'color': 'yellow',
        'message': '3333333333333333333'
      },
      {
        'color': 'green',
        'message': '44444444444444444444444'
      },
      {
        'color': 'blue',
        'message': '55555555555555555555555555'
      },
      {
        'color': 'indigo',
        'message': '666666666666666666666666666'
      },
      {
        'color': 'violet',
        'message': '77777777777777777777777777777777'
      },
    );
  }

  private renderUI(r: Renderer) {
    // Render map
    let mapPoint = new Point2d(this.gameCtx.size.w - 256, 0);
    let mapDimension = new Dimension2d(256, 200);
    r.rect('green', mapPoint.x, mapPoint.y, mapDimension.w, mapDimension.h);
    r.text('Minimap', mapPoint.x + 10, mapPoint.y + 20);
    r.hr(mapPoint.x, mapPoint.y + 30, mapDimension.w, 'black', 1);

    // Render inventory
    let inventoryPoint = new Point2d(this.gameCtx.size.w - 256, 200);
    let inventoryDimension = new Dimension2d(256, this.gameCtx.size.h - mapDimension.h);
    r.rect('pink', inventoryPoint.x, inventoryPoint.y, inventoryDimension.w, inventoryDimension.h);
    r.text('Inventory', inventoryPoint.x + 10, inventoryPoint.y + 20);
    r.hr(inventoryPoint.x, inventoryPoint.y + 30, inventoryDimension.w, 'black', 1);

    // Render chatbox
    let chatboxPoint = new Point2d(0, this.gameCtx.size.h - 200);
    let chatboxDimension = new Dimension2d(this.gameCtx.size.w - inventoryDimension.w, 200);
    r.rect('lightblue', chatboxPoint.x, chatboxPoint.y, chatboxDimension.w, chatboxDimension.h);
    r.text('Chatbox', chatboxPoint.x + 10, chatboxPoint.y + 20);
    r.hr(chatboxPoint.x, chatboxPoint.y + 30, chatboxDimension.w, 'black', 1);
    for (let i = 0; i < 8; i++) {
      let line = this.gameCtx.chatboxLines[this.gameCtx.chatboxLines.length - i - 1];
      if (!line) {
        return;
      }
      r.text(line.message, chatboxPoint.x + 10, (this.gameCtx.size.h - 10) - (20 * i), line.color);
    }
  }

  public render(r: Renderer) {
    this.hero.render(r);
    this.renderUI(r);
    r.circle('black', this.mouse.x, this.mouse.y, 4);
  }

  public update(dt: number) {
    let speed = 1.5;

    if (this.keys.isDown(this.keys.DOWN) || this.keys.isDown(this.keys.UP) ||
        this.keys.isDown(this.keys.RIGHT) || this.keys.isDown(this.keys.LEFT)) {
      this.hero.switchAnim('walk');
    } else {
      this.hero.switchAnim('idle');
    }
    if (this.keys.isDown(this.keys.DOWN)) {
      if (this.keys.isDown(this.keys.LEFT)) {
        this.hero.move(speed, 1);
      } else if (this.keys.isDown(this.keys.RIGHT)) {
        this.hero.move(speed, 7);
      } else {
        this.hero.move(speed, 0);
      }
    } else if (this.keys.isDown(this.keys.UP)) {
      if (this.keys.isDown(this.keys.LEFT)) {
        this.hero.move(speed, 3);
      } else if (this.keys.isDown(this.keys.RIGHT)) {
        this.hero.move(speed, 5);
      } else {
        this.hero.move(speed, 4);
      }
    } else if (this.keys.isDown(this.keys.LEFT)) {
      this.hero.move(speed, 2);
    } else if (this.keys.isDown(this.keys.RIGHT)) {
      this.hero.move(speed, 6);
    }
    this.hero.update(dt);
  }


  public end() {

  }
}

window.onload = () => {
  let diablo = new Diablo();
  diablo.run();
}
