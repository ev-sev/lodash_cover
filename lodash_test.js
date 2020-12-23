// description and some tests taken of https://lodash.com/docs/4.17.15

let falsey = [, null, undefined, false, 0, NaN, ''];
let stubArray = [];


describe('chunk', function() {
  let chunk = _.chunk;

  var array = [0, 1, 2, 3, 4, 5];

  it('should return chunked arrays', function() {
    var actual = chunk(array, 3);
    assert.deepEqual(actual, [[0, 1, 2], [3, 4, 5]]);
  });

  it('should return the last chunk as remaining elements', function() {
    var actual = chunk(array, 4);
    assert.deepEqual(actual, [[0, 1, 2, 3], [4, 5]]);
  });

  it('should treat falsey `size` values, except `undefined`, as `0`', function() {
    var expected = _.map(falsey, function(value) {
      return value === undefined ? [[0], [1], [2], [3], [4], [5]] : [];
    });

    var actual = _.map(falsey, function(size, index) {
      return index ? chunk(array, size) : chunk(array);
    });

    assert.deepEqual(actual, expected);
  });

  it('should ensure the minimum `size` is `0`', function() {
    var values = _.reject(falsey, _.isUndefined).concat(-1, -Infinity),
        expected = _.map(values, x=>stubArray);

    var actual = _.map(values, function(n) {
      return chunk(array, n);
    });

    assert.deepEqual(actual, expected);
  });

  it('should coerce `size` to an integer', function() {
    assert.deepEqual(chunk(array, array.length / 4), [[0], [1], [2], [3], [4], [5]]);
  });
});

describe("compact", function() {
  it("Creates a new array concatenating array with any additional arrays and/or values.", 
    function() {
      let args = [[0, 1, false, 2, '', 3]];
      let func = "compact";
      assert.deepEqual(__[func](...args), _[func](...args));
    });
});

describe("concat", function() {
  it("Creates a new array concatenating array with any additional arrays and/or values.",
    function() {
      var array = [1];
      var other = __.concat(array, 2, [3], [[4]]);
      var array1 = [1];
      var other1 = _.concat(array, 2, [3], [[4]]);
      assert.deepEqual(array, array1);
      assert.deepEqual(other, other1);
    });
});

describe("difference", function() {
  it("Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.",
  function() {
    let args = [[2, 1], [2, 3]];
    let func = "difference";
    assert.deepEqual(__[func](...args), _[func](...args));
  });
});
