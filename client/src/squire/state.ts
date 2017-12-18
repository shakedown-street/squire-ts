import { Event, EventManager, Renderer, SquireGame } from './';

export abstract class State {

  public eventManager: EventManager;

  private _active = true;

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = value;
  }

  constructor(public gameCtx: any) {
    this.eventManager = new EventManager(this);
    gameCtx.canvas.addEventListener('click', (canvasEvent: any) => {
      this.eventManager.forEachEvent(this.eventManager.clickEvents, (e: Event) => {
        e.handleEvent(canvasEvent, this);
      });
    }, false);
    gameCtx.canvas.addEventListener('mousemove', (canvasEvent: any) => {
      this.eventManager.forEachEvent(this.eventManager.mouseEvents, (e: Event) => {
        e.handleEvent(canvasEvent, this);
      });
    }, false);
  }

  public abstract init(): void;

  public abstract render(r: Renderer): void;

  public abstract update(dt: number): void;

  public abstract end(): void;

}
