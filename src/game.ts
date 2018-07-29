import { sortBy as _sortBy } from 'lodash';

import {
  Point2d,
  Random,
  Renderer,
  FractalRenderer,
  State,
  SquireGame,
} from './squire';

export class TestGame extends SquireGame {

  private gameState: GameState;

  constructor() {
    super('squire');
    this.gameState = new GameState(this);
    this.stateManager.state = this.gameState;
  }
}

class GameState extends State {

  private fractalRenderer: FractalRenderer = null;

  constructor(gameCtx: any) {
    super(gameCtx);
  }

  public init() { }

  public end() { }

  public render(r: Renderer) {
    if (!this.fractalRenderer) {
      this.fractalRenderer = new FractalRenderer(r.ctx);
    }
    r.rect('green', 0, 0, 800, 600);
    this.fractalRenderer.lines(400, 300, 800, 500);
  }

  public update(dt: number) {

  }
}

window.onload = () => {
  let squire = new TestGame();
  squire.run();
}
