tr.util.Fib = function () {
  var self = {};

  self.sequence = function (length) {
    var result = [0, 1];

    for (var i = 2; i < length; i++) {
      result[i] = result[i-2] + result[i-1];
    }

    return result;
  };

  self.sum = function (length) {
    if (length === 0) { return 0; }
    if (length === 1) { return 1; }

    return self.sequence(length).reduce(function (previous, current) {
      return previous + current;
    }, 0);
  };

  return self;
};
