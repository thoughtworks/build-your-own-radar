const QueryParams = function (queryString) {
  var decode = function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '))
  }

  var search = /([^&=]+)=?([^&]*)/g

  var queryParams = {}
  var match
  while ((match = search.exec(queryString))) {
    queryParams[decode(match[1])] = decode(match[2])
  }

  return queryParams
}

module.exports = QueryParams
