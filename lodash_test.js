// description and some tests taken of https://lodash.com/docs/4.17.15

describe("chunk", function() {

  it("Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.", 
    function() {
      assert.deepEqual(__.chunk(['a', 'b', 'c', 'd'], 2), _.chunk(['a', 'b', 'c', 'd'], 2));
      assert.deepEqual(__.chunk(['a', 'b', 'c', 'd'], 3), _.chunk(['a', 'b', 'c', 'd'], 3));
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
