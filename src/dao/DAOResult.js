// @flow

class DAOResult<TEntity> {
  _count: ?number;
  _data: ?TEntity | ?Array<TEntity>;
  _error: ?Error;

  constructor(
    data: ?TEntity | ?Array<TEntity>,
    count: ?number,
    error?: Error,
  ) {
    this._count = count;
    this._data = data;
    this._error = error;
  }

  count = (): ?number =>
    this._error ? null : this._count;

  getData = (): ?TEntity | ?Array<TEntity> =>
    this._error ? null : this._data;

  getError = (): ?Error => this._error;
}

export default DAOResult;
