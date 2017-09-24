import { Renderer, State } from './';
import { sortBy as _sortBy, reverse as _reverse } from 'lodash';

export class StateManager {

  private _states: State[] = [];

  constructor() {}

  public add(state: State) {
    this._states.push(state);
    state.init();
  }

  public remove(state: State) {
    let stateIndex = this._states.indexOf(state);
    if (stateIndex === -1) {
      console.warn('State not found');
      return;
    }
    state.end();
    delete this._states[stateIndex];
  }

  public update(dt: number): void {
    try {
      this.eachState((state) => {
        if (state.active) {
          state.update(dt);
        }
      });
    } catch(e) {
      console.warn(e);
    }
  }

  public render(r: Renderer): void {
    try {
      this.eachState((state) => {
        if (state.active) {
          state.render(r);
        }
      });
    } catch(e) {
      console.warn(e);
    }
  }

  private statesOrdered() {
    return _reverse(_sortBy(this._states, 'zIndex'));
  }

  private eachState(call = (state: State) => {}) {
    this.statesOrdered().forEach(call);
  }

}
