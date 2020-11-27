__.first([1, 2, 3]);
// => 1

__.first([1, 2, 3], 2);
// => [1, 2]

__.first([1, 2, 3], function(num) {
  return num < 3;
});
// => [1, 2]

var food = [
  { 'name': 'banana', 'organic': true },
  { 'name': 'beet',   'organic': false },
];

// using "_.pluck" callback shorthand
__.first(food, 'organic');
// => [{ 'name': 'banana', 'organic': true }]

var food = [
  { 'name': 'apple',  'type': 'fruit' },
  { 'name': 'banana', 'type': 'fruit' },
  { 'name': 'beet',   'type': 'vegetable' }
];

// using "_.where" callback shorthand
__.first(food, { 'type': 'fruit' });
// => [{ 'name': 'apple', 'type': 'fruit' }, { 'name': 'banana', 'type': 'fruit' }]
