/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import nullthrows from 'nullthrows';

export type LoadObjectOperation =
  | 'NONE'
  | 'CREATING'
  | 'LOADING'
  | 'UPDATING'
  | 'DELETING';

type Unwrap = <T>(loadObject: LoadObject<T>) => T;

/**
 * A secret key that is used to prevent direct construction of these objects,
 * this is effectively used to ensure that the constructor is private.
 */
const SECRET = `SECRET_${Math.random()}`;

const VALUES_TO_CACHE = [undefined, null, false, true, 0, ''];
const CACHE: Map<
  any,
  Map<boolean, Map<?LoadObjectOperation, LoadObject<any>>>,
> = new Map(
  VALUES_TO_CACHE.map(
    (value: any): any => [
      value,
      new Map([[true, new Map()], [false, new Map()]]),
    ],
  ),
);

/**
 * Immutable Load Object. This is an immutable object that represents a
 * particular point in time for a request. Some examples:
 *
 * Render spinners while loading:
 *
 *   if (loadObject.isLoading()) {
 *     return <Spinner />;
 *   }
 *   return <div>...</div>;
 *
 * Render errors with an error:
 *
 *   if (loadObject.hasError()) {
 *     return <ErrorBox error={loadObject.getError()} />;
 *   }
 *   return <div>...</div>;
 *
 * Render normally when there's a value:
 *
 *   return <div>{loadObject.getValue().text}</div>;
 *
 */
class LoadObject<TValue> {
  _operation: ?LoadObjectOperation;

  _value: ?TValue;

  _error: ?Error;

  _hasValue: boolean;

  /**
   * Private construtor, never call this outside of this class.
   */
  constructor(
    secret: string,
    operation: ?LoadObjectOperation,
    value: ?TValue,
    error: ?Error,
    hasValue: boolean,
  ) {
    if (secret !== SECRET) {
      throw new Error(
        'Construct LoadObjects using static methods such as ' +
          'LoadObject.loading(), LoadObject.empty()',
      );
    }
    this._operation = operation;
    this._value = value;
    this._error = error;
    this._hasValue = hasValue;
  }

  static _create(
    operation: ?LoadObjectOperation,
    value: ?TValue,
    error: ?Error,
    hasValue: boolean,
  ): LoadObject<TValue> {
    const cachedItem = LoadObject._getFromCache(
      operation,
      value,
      error,
      hasValue,
    );
    return (
      cachedItem || new LoadObject(SECRET, operation, value, error, hasValue)
    );
  }

  static _getFromCache(
    operation: ?LoadObjectOperation,
    value: ?TValue,
    error: ?Error,
    hasValue: boolean,
  ): ?LoadObject<TValue> {
    if (error !== undefined || !CACHE.has(value)) {
      return null;
    }

    const operationMapByHasValue = nullthrows(CACHE.get(value));
    const loaderByOperation = nullthrows(operationMapByHasValue.get(hasValue));
    if (!loaderByOperation.has(operation)) {
      const object = new LoadObject(SECRET, operation, value, error, hasValue);
      loaderByOperation.set(operation, object);
    }

    return nullthrows(loaderByOperation.get(operation));
  }

  // Convenient getters

  getOperation(): ?LoadObjectOperation {
    return this._operation;
  }

  getValue(): ?TValue {
    return this._value;
  }

  getValueEnforcing(): TValue {
    if (!this.hasValue()) {
      throw new Error('Expected load object to have a value set.');
    }
    // We check hasValue and cast rather than checking if value is null so that
    // it's possible to have "null" values that are set.
    return (this._value: any);
  }

  getError(): ?Error {
    return this._error;
  }

  getErrorEnforcing(): Error {
    if (!this._error) {
      throw new Error('Expected load object to have an error set.');
    }
    return this._error;
  }

  hasOperation(): boolean {
    return this._operation !== 'NONE';
  }

  hasValue(): boolean {
    return this._hasValue;
  }

  hasError(): boolean {
    return !!this._error;
  }

  isEmpty(): boolean {
    return !this.hasValue() && !this.hasOperation() && !this.hasError();
  }

  // Convenient setters

  setOperation(operation: LoadObjectOperation): LoadObject<TValue> {
    if (this._operation === operation) {
      return this;
    }

    return LoadObject._create(
      operation,
      this.getValue(),
      this.getError(),
      this.hasValue(),
    );
  }

  setValue(value: TValue): LoadObject<TValue> {
    if (this._value === value && this._hasValue === true) {
      return this;
    }
    return LoadObject._create(
      this.getOperation(),
      value,
      this.getError(),
      this.hasValue(),
    );
  }

  setError(error: Error): LoadObject<TValue> {
    if (this._error === error) {
      return this;
    }
    return LoadObject._create(
      this.getOperation(),
      this.getValue(),
      error,
      this.hasValue(),
    );
  }

  removeOperation(): LoadObject<TValue> {
    if (this._operation === 'NONE') {
      return this;
    }
    return LoadObject._create(
      'NONE',
      this.getValue(),
      this.getError(),
      this.hasValue(),
    );
  }

  removeValue(): LoadObject<TValue> {
    if (this._value === undefined && this._hasValue === false) {
      return this;
    }
    return LoadObject._create(
      this.getOperation(),
      undefined,
      this.getError(),
      false,
    );
  }

  removeError(): LoadObject<TValue> {
    if (this._error === undefined) {
      return this;
    }
    return LoadObject._create(
      this.getOperation(),
      this.getValue(),
      undefined,
      this.hasValue(),
    );
  }

  map<TType>(
    fn: (value: TValue) => TType | LoadObject<TType>,
  ): LoadObject<TType> {
    if (!this.hasValue()) {
      return (this: any);
    }

    const output = fn(this.getValueEnforcing());

    const loader =
      output instanceof LoadObject ? output : this.setValue((output: any));

    return (loader: any);
  }

  mapError<TType>(
    fn: (value: Error) => Error | LoadObject<TType>,
  ): LoadObject<TType> {
    if (!this.hasError()) {
      return (this: any);
    }

    const output = fn(this.getErrorEnforcing());

    const loader =
      output instanceof LoadObject ? output : this.setValue((output: any));

    return (loader: any);
  }

  //  some helper methods to check specific operations

  isDone(): boolean {
    return !this.hasOperation();
  }

  isCreating(): boolean {
    return this.getOperation() === 'CREATING';
  }

  isLoading(): boolean {
    return this.getOperation() === 'LOADING';
  }

  isUpdating(): boolean {
    return this.getOperation() === 'UPDATING';
  }

  isDeleting(): boolean {
    return this.getOperation() === 'DELETING';
  }

  // Provide some helpers for mutating the operations

  done(): LoadObject<TValue> {
    return this.removeOperation();
  }

  creating(): LoadObject<TValue> {
    return this.setOperation('CREATING');
  }

  loading(): LoadObject<TValue> {
    return this.setOperation('LOADING');
  }

  updating(): LoadObject<TValue> {
    return this.setOperation('UPDATING');
  }

  deleting(): LoadObject<TValue> {
    return this.setOperation('DELETING');
  }

  // Static helpers for creating LoadObjects

  static empty<V>(): LoadObject<V> {
    return LoadObject._create('NONE', undefined, undefined, false);
  }

  static creating<V>(): LoadObject<V> {
    return LoadObject._create('CREATING', undefined, undefined, false);
  }

  static loading<V>(): LoadObject<V> {
    return LoadObject._create('LOADING', undefined, undefined, false);
  }

  static updating<V>(): LoadObject<V> {
    return LoadObject._create('UPDATING', undefined, undefined, false);
  }

  static deleting<V>(): LoadObject<V> {
    return LoadObject._create('DELETING', undefined, undefined, false);
  }

  static withError<V>(error: Error): LoadObject<V> {
    return LoadObject._create('NONE', undefined, error, false);
  }

  static withValue<V>(value: V): LoadObject<V> {
    return LoadObject._create('NONE', value, undefined, true);
  }

  static merge<
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T:
      | [LoadObject<T1>, LoadObject<T2>]
      | [LoadObject<T1>, LoadObject<T2>, LoadObject<T3>]
      | [LoadObject<T1>, LoadObject<T2>, LoadObject<T3>, LoadObject<T4>]
      | [
          LoadObject<T1>,
          LoadObject<T2>,
          LoadObject<T3>,
          LoadObject<T4>,
          LoadObject<T5>,
        ]
      | [
          LoadObject<T1>,
          LoadObject<T2>,
          LoadObject<T3>,
          LoadObject<T4>,
          LoadObject<T5>,
          LoadObject<T6>,
        ]
      | [
          LoadObject<T1>,
          LoadObject<T2>,
          LoadObject<T3>,
          LoadObject<T4>,
          LoadObject<T5>,
          LoadObject<T6>,
          LoadObject<T7>,
        ]
      | [
          LoadObject<T1>,
          LoadObject<T2>,
          LoadObject<T3>,
          LoadObject<T4>,
          LoadObject<T5>,
          LoadObject<T6>,
          LoadObject<T7>,
          LoadObject<T8>,
        ]
      | [
          LoadObject<T1>,
          LoadObject<T2>,
          LoadObject<T3>,
          LoadObject<T4>,
          LoadObject<T5>,
          LoadObject<T6>,
          LoadObject<T7>,
          LoadObject<T8>,
          LoadObject<T9>,
        ],
  >(loadObjects: T): LoadObject<$TupleMap<T, Unwrap>> {
    const values = [];
    let error = null;
    let operation = null;

    loadObjects.forEach((loadObject: LoadObject<any>) => {
      error = error || loadObject.getError();

      if (loadObject.hasOperation()) {
        operation = operation || loadObject.getOperation();
      }

      values.push(loadObject.getValue());
    });

    if (error) {
      return LoadObject.withError(error);
    }

    if (operation) {
      return LoadObject.empty().setOperation(operation);
    }

    return LoadObject.withValue(((values: any): $TupleMap<T, Unwrap>));
  }
}

export default LoadObject;
