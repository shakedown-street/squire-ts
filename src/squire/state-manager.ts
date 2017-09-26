import { Renderer, State } from './';
import { sortBy as _sortBy, reverse as _reverse } from 'lodash';

export class StateManager {

  private _state: State;

  get state() {
    return this._state;
  }

  set state(value: State) {
    this._state = value;
    this._state.init();
  }

  constructor() {}

  public update(dt: number): void {
    try {
      if (this.state.active) {
        this.state.update(dt);
      }
    } catch(e) {
      console.warn(e);
    }
  }

  public render(r: Renderer): void {
    try {
      if (this._state.active) {
        this._state.render(r);
      }
    } catch(e) {
      console.warn(e);
    }
  }

}
