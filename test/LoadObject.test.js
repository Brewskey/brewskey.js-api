/* eslint-disable */
import test from 'ava';
import LoadObject from '../src/LoadObject';

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

  t.is(valueNumber, loaderNumber.getValue());
  t.deepEqual(valueObj, loaderObject.getValue());
  t.deepEqual(valueArray, loaderArray.getValue());
});

test('should map loader value', t => {
  const value = 1;
  const loader = LoadObject.withValue(value);
  const resultLoader = loader.map(value => value + 1);

  t.is(resultLoader.getValue(), 2);
});

test('cached LoadObject should pass immutable equality check', t => {
  const loaderLoading1 = LoadObject.loading();
  const loaderLoading2 = LoadObject.loading();

  t.truthy(loaderLoading1 === loaderLoading2);
});

test('LoadObject should not pass immutable equality check', t => {
  const loaderValue1 = LoadObject.withValue({ a: 123 });
  const loaderValue2 = LoadObject.withValue({ a: 123 });

  t.truthy(loaderValue1 !== loaderValue2);
});
