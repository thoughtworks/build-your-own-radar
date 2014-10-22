describe('tr.util.Fib', function () {
  it('returns the fibonacci sequence', function () {
    var fib = new tr.util.Fib();

    expect(fib.sequence(5)).toEqual([0, 1, 1, 2, 3]);
  });

  it('returns the sum of a sequence', function () {
    var fib = new tr.util.Fib();

    expect(fib.sum(5)).toEqual(12);
  });
});
