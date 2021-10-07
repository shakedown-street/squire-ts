import { Renderer, State } from './';

export class StateManager {
  private _state: State;

  constructor() {}

  public update(dt: number): void {
    try {
      this._state.update(dt);
    } catch (e) {
      console.error(e);
    }
  }

  public render(r: Renderer): void {
    try {
      this._state.render(r);
    } catch (e) {
      console.error(e);
    }
  }

  public get state() {
    return this._state;
  }

  public set state(value: State) {
    this._state = value;
    this._state.init();
  }
}
