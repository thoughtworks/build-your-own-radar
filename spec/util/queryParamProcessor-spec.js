const QueryParams = require('../../src/util/queryParamProcessor');

describe('QueryParams', () => {
  it('retrieves one parameter', () => {
    var params = QueryParams('param1=value1');

    expect(params.param1).toEqual('value1');
  });

  it('retrieves zero parameter', () => {
    var params = QueryParams('');

    expect(params).toEqual({});
  });

  it('retrieves two parameters', () => {
    var params = QueryParams('param1=value1&param2=value2');

    expect(params.param1).toEqual('value1');
    expect(params.param2).toEqual('value2');
  });
});
