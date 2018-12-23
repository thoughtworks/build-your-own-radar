const QueryParams = require('../../src/util/queryParamProcessor')

describe('QueryParams', function () {
  it('retrieves one parameter', function () {
    var params = QueryParams('param1=value1')

    expect(params.param1).toEqual('value1')
  })

  it('retrieves zero parameter', function () {
    var params = QueryParams('')

    expect(params).toEqual({})
  })

  it('retrieves one parameter', function () {
    var params = QueryParams('param1=value1&param2=value2')

    expect(params.param1).toEqual('value1')
    expect(params.param2).toEqual('value2')
  })
})
