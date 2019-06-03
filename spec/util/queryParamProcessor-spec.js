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

  it('decode params and retrieve', function () {
    var params = QueryParams('title=build%20your%20own%20radar&subtitle=value2&sheetId=12345')
    expect(params.title).toEqual('build your own radar')
    expect(params.subtitle).toEqual('value2')
    expect(params.sheetId).toEqual('12345')
  })
})
