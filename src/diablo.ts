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
  Skeleton,
} from './';

export class Diablo extends SquireGame {

  public chatboxLines: any[] = [];
  private frameState: FrameState;
  private gameState: GameState;

  constructor() {
    super('diablo');
    this.frameState = new FrameState(this);
    this.gameState = new GameState(this);
    // this.stateManager.add(this.frameState);
    this.stateManager.add(this.gameState);
  }
}

class FrameState extends State {

  constructor(gameCtx: any) {
    super(gameCtx, 'frame-state', 1);
  }

  public init() {

  }

  public render(r: Renderer) {
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

  public update(dt: number) {

  }

  public end() {

  }

}

class GameState extends State {

  private mouse: Point2d;
  private skeleton: Skeleton;
  private hero: Hero;

  constructor(gameCtx: any) {
    super(gameCtx, 'game-state', 2);
    this.skeleton = new Skeleton(new Point2d(180, 180));
    this.hero = new Hero(new Point2d(400, 150));
    this.gameCtx.canvas.addEventListener('mousemove', (canvasEvent: any) => {
      let offsetX, offsetY = 0;
      let element = this.gameCtx.canvas;
      offsetX = this.gameCtx.canvas.offsetLeft;
      offsetY = this.gameCtx.canvas.offsetTop;

      this.mouse = new Point2d(
        canvasEvent.clientX - offsetX,
        canvasEvent.clientY - offsetY
      );
      this.hero.checkDirection(this.mouse);
      this.skeleton.direction = this.hero.direction;
      console.log('direction', this.hero.direction);
    }, false);
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

  public render(r: Renderer) {
    r.circle('black', this.mouse.x, this.mouse.y, 4);
    this.hero.render(r);
    this.skeleton.render(r);
  }

  public update(dt: number) {
    this.hero.update(dt);
  }

  public end() {

  }
}

window.onload = () => {
  let diablo = new Diablo();
  diablo.run();
}
