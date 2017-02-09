// @flow

import type { OHandler } from 'odata';

class DAOResult<TModel> {
  _data: ?TModel | ?Array<TModel>;
  _count: ?number;
  _resultHandler: ?OHandler<TModel>;
  _error: ?Error;

  constructor(
    data: ?TModel | ?Array<TModel>,
    count: ?number,
    error?: Error,
  ) {
    this._count = count;
    this._data = data;
    this._error = error;
  }

  count = (): ?number =>
    this._error ? null : this._count;

  getData = (): ?TModel | ?Array<TModel> =>
    this._error ? null : this._data;

  getError = (): ?Error => this._error;
}

export default DAOResult;
