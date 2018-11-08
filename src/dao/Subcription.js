// @flow

class Subcription {
  _subscriptions: Set<() => void> = new Set();

  subscribe(handler: () => void) {
    this._subscriptions.add(handler);
  }

  unsubscribe(handler: () => void) {
    this._subscriptions.delete(handler);
  }

  __emitChanges() {
    this._subscriptions.forEach((handler: () => void): void => handler());
  }
}

export default Subcription;
