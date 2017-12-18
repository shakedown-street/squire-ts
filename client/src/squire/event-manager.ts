import { Event } from './';
import { sortBy as _sortBy, reverse as _reverse } from 'lodash';

export class EventManager {

  public clickEvents: Event[] = [];
  public mouseEvents: Event[] = [];

  constructor(public stateCtx: any) {}

  public orderEvents(arr: Event[]) {
    return _sortBy(arr, 'zIndex');
  }

  public forEachEvent(events: Event[], call = (event: Event) => {}) {
    this.orderEvents(events).forEach(call);
  }
}
