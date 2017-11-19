// @flow

import type { RecordFactory } from 'immutable';

import { Record, fromJS, isImmutable } from 'immutable';

const SECRET = `SECRET${Math.random()}`;

export type LoadObjectOperation =
  | 'CREATING'
  | 'DELETING'
  | 'LOADING'
  | 'NONE'
  | 'UPDATING';

type LoadObjectRecordProps = {
  error: ?Error,
  internalHasValue: boolean,
  operation: ?LoadObjectOperation,
  // todo annotate it better
  // it should be Map<string, any> or any core immutable type
  // but i couldnt't make flow happy with it
  value: any,
};

const LoadObjectRecordFactory: RecordFactory<LoadObjectRecordProps> = Record({
  error: undefined,
  internalHasValue: false,
  operation: undefined,
  value: undefined,
});

class LoadObject<TValue> extends LoadObjectRecordFactory {
  constructor({
    secret,
    ...props
  }: LoadObjectRecordProps & { secret: string }) {
    if (secret !== SECRET) {
      throw new Error('use static methods for construct LoadObject');
    }
    super(props);
  }

  static _create(props: LoadObjectRecordProps): LoadObject<TValue> {
    return new LoadObject({ ...props, secret: SECRET });
  }

  static creating(): LoadObject<TValue> {
    return LoadObject._create({
      error: undefined,
      internalHasValue: false,
      operation: 'CREATING',
      value: undefined,
    });
  }

  static deleting(): LoadObject<TValue> {
    return LoadObject._create({
      error: undefined,
      internalHasValue: false,
      operation: 'DELETING',
      value: false,
    });
  }

  static empty(): LoadObject<TValue> {
    return LoadObject._create({
      error: undefined,
      internalHasValue: false,
      operation: undefined,
      value: false,
    });
  }

  static loading(): LoadObject<TValue> {
    return LoadObject._create({
      error: undefined,
      internalHasValue: false,
      operation: 'LOADING',
      value: false,
    });
  }

  static updating(): LoadObject<TValue> {
    return LoadObject._create({
      error: undefined,
      internalHasValue: false,
      operation: 'UPDATING',
      value: false,
    });
  }

  static withError(error: Error): LoadObject<TValue> {
    return LoadObject._create({
      error,
      internalHasValue: false,
      operation: undefined,
      value: false,
    });
  }

  static withValue(value: TValue): LoadObject<TValue> {
    return LoadObject._create({
      error: undefined,
      internalHasValue: true,
      operation: undefined,
      value: fromJS(value),
    });
  }

  get operation(): ?LoadObjectOperation {
    return this.get('operation');
  }

  get value(): ?TValue {
    const value = this.get('value');
    return isImmutable(value) ? value.toJS() : value;
  }

  get valueEnforcing(): TValue {
    if (!this.hasValue) {
      throw new Error("Expected LoadObject's value to be set");
    }
    const value = this.get('value');
    return isImmutable(value) ? value.toJS() : value;
  }

  get error(): ?Error {
    return this.get('error');
  }

  get errorEnforcing(): Error {
    const error = this.get('error');
    if (!error) {
      throw new Error("Expected LoadObject's error to be set");
    }

    return error;
  }

  get hasValue(): boolean {
    return !!this.get('internalHasValue');
  }

  get hasOperation(): boolean {
    return this.operation !== undefined;
  }

  get hasError(): boolean {
    return this.error !== undefined;
  }

  get isEmpty(): boolean {
    return !this.hasValue && !this.hasOperation && !this.hasError;
  }

  get isCreating(): boolean {
    return this.operation === 'CREATING';
  }

  get isDeleting(): boolean {
    return this.operation === 'DELETING';
  }

  get isDone(): boolean {
    return !this.hasOperation;
  }

  get isLoading(): boolean {
    return this.operation === 'LOADING';
  }

  get isUpdating(): boolean {
    return this.operation === 'UPDATING';
  }

  setOperation(operation: ?LoadObjectOperation): LoadObject<TValue> {
    return (this: any).set('operation', operation);
  }

  setValue(value: TValue): LoadObject<TValue> {
    return (this: any).set('value', value).set('internalHasValue', true);
  }

  setError(error: ?Error): LoadObject<TValue> {
    return (this: any).set('error', error);
  }

  removeOperation(): LoadObject<TValue> {
    return (this: any).remove('operation');
  }

  removeValue(): LoadObject<TValue> {
    return (this: any).remove('value').remove('internalHasValue');
  }

  removeError(): LoadObject<TValue> {
    return (this: any).remove('error');
  }

  map<TNext>(
    fn: (value: TValue) => LoadObject<TNext> | TNext,
  ): LoadObject<TNext> {
    if (!this.hasValue) {
      return (this: any);
    }

    const value = this.valueEnforcing;
    const next: any = fn(value);

    const result = next instanceof LoadObject ? next : this.setValue(next);
    return (result: any);
  }

  mapError<TNext>(
    fn: (error: Error) => LoadObject<TNext> | Error,
  ): LoadObject<TNext> | this {
    if (!this.hasError) {
      return this;
    }

    const error = this.errorEnforcing;
    const next = fn(error);

    return next instanceof LoadObject ? next : this.setError(next);
  }
}

export default LoadObject;
