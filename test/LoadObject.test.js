/* eslint-disable */
import test from 'ava';
import { is } from 'immutable';
import LoadObject from '../src/LoadObject_anton';

test('should create LoadObject with creating state', t => {
  const loader = LoadObject.creating();
  t.truthy(loader.isCreating);
});

test('should create LoadObject with deleting state', t => {
  const loader = LoadObject.deleting();
  t.truthy(loader.isDeleting);
});

test('should create LoadObject with loading state', t => {
  const loader = LoadObject.loading();
  t.truthy(loader.isLoading);
});

test('should create LoadObject with updating state', t => {
  const loader = LoadObject.loading();
  t.truthy(loader.isLoading);
});

test('should create LoadObject with value', t => {
  const valueNumber = 123;
  const valueObj = { a: 'test value' };
  const valueArray = [{ a: 1 }, { b: 2 }, { c: 'romba' }];

  const loaderNumber = LoadObject.withValue(valueNumber);
  const loaderObject = LoadObject.withValue(valueObj);
  const loaderArray = LoadObject.withValue(valueArray);

  t.is(valueNumber, loaderNumber.value);
  t.deepEqual(valueObj, loaderObject.value);
  t.deepEqual(valueArray, loaderArray.value);
});

test('should map loader value', t => {
  const values = 1;
  const loader = LoadObject.withValue(values);
  const resultLoader = loader.map(value => value + 1);

  t.is(resultLoader.value, 2);
});

test('should pass immutable equality check', t => {
  const loaderLoading1 = LoadObject.loading();
  const loaderLoading2 = LoadObject.loading();
  const loaderValue1 = LoadObject.withValue({ a: 123 });
  const loaderValue2 = LoadObject.withValue({ a: 123 });

  t.truthy(is(loaderLoading1, loaderLoading2));
  t.truthy(is(loaderValue1, loaderValue2));
});
