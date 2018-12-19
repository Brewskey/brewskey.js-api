// @flow

export type ErrorHandler = (error: Error) => void;

class Subscription {
  static _errorSubscriptions: Set<ErrorHandler> = new Set();

  static onError = (handler: ErrorHandler) => {
    Subscription._errorSubscriptions.add(handler);
  };

  static __emitError(error: Error) {
    Subscription._errorSubscriptions.forEach((handler: ErrorHandler) =>
      handler(error),
    );
  }

  _dataSubscriptions: Set<() => void> = new Set();

  subscribe(handler: () => void) {
    this._dataSubscriptions.add(handler);
  }

  unsubscribe(handler: () => void) {
    this._dataSubscriptions.delete(handler);
  }

  __emitChanges() {
    this._dataSubscriptions.forEach((handler: () => void) => handler());
  }
}

export default Subscription;
