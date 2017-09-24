import { Renderer, SquireGame } from './';

export abstract class State {

  private _active: boolean;

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = value;
  }

  constructor(public gameCtx: any, public name: string, public zIndex: number) {}

  public abstract init(): void;

  public abstract render(r: Renderer): void;

  public abstract update(dt: number): void;

  public abstract end(): void;

}
