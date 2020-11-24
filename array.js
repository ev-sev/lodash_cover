let __ = {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    head,
    last,
    flatten,
}

function chunk(array, size = 1) {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

function compact(array) {
    return array.filter((x)=>!!x);
}

function isArray(a) {
    return a instanceof Array;  //stub
}

function isFunction(a) {
    return a instanceof Function; //stub
}


function toarray(x) {
    if (isArray(x)) return x;
    return [x];
}

function concat(array, ...v) {
    let result = array.slice();
    for (let i in v) 
        toarray(v[i]).forEach((x)=>result.push(x));
    return result;
}

function difference(array, ...diff) {
    diff = diff.filter(isArray);  // i dont like that, but for compatibility
    let diffset = new Set(concat([], ...diff));
    return array.filter((x)=>!diffset.has(x));
}

// _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]
 
// The `_.property` iteratee shorthand.
// _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'); 
// _,property - implemented, but need more testing
// _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], (a)=>a.x); 

function differenceBy(array, ...diff) { 
    let iteratee = (x)=>x;
    if (isFunction(last(diff))) iteratee = diff.pop();
    diff = diff.filter(isArray); 
    diff = concat([], ...diff);
    
    let diffset = new Set(diff.map(iteratee));
    return array.filter((x)=>!diffset.has(iteratee(x)));
}

// differenceWith - O(N*N)
// makeComaparatorArrayToOne - ÑÐ¾Ð·Ð´Ð°ÐµÑ‚ Ñ„ÑƒÐ½ÐºÑ†Ð¸ÑŽ ÐºÐ¾Ð¼Ð¿Ð°Ñ€Ð°Ñ‚Ð¾Ñ€, ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð¸ÑÑ‚Ð¸Ñ‚Ð¸Ð½Ð½Ð°, ÐµÑÐ»Ð¸ Ð¸ÑÑ‚Ð¸Ð½Ð½Ð¾ Ñ…Ð¾Ñ‚ÑÐ±Ñ‹ Ð¾Ð´Ð½Ð¾ ÑÑ€Ð°Ð²Ð½ÐµÐ½Ð¸Ðµ Ñ„Ð¸Ð½ÐºÑ†Ð¸ÐµÐ¹ comparatorOneToOne
function makeComaparatorArrayToOne(array, comparatorOneToOne) {  
    return function(one) {
        for (let i in array) {
            if (comparatorOneToOne(array[i], one)) return true;
        }
        return false;
    }
}

// makeNotFunction - Ð½Ð° Ð²Ñ…Ð¾Ð´Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ Ñ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÐ¼Ñ‹Ð¼ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ Ð»Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ñ‚Ð¸Ð¿Ð°, Ð½Ð° Ð²Ñ‹Ñ…Ð¾Ð´Ðµ Ð½Ð¾Ð²Ð°Ñ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ - Ð»Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ°Ñ Ð¸Ð½Ð²ÐµÑ€ÑÐ¸Ñ Ð²Ñ…Ð¾Ð´Ð½Ð¾Ð¹ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸
function makeNotFunction(f) {
    return function(...args) {
        return !f(...args);
    }
}

function differenceWith(array, ...diff) { 
    let comparator = (x, y)=>x==y;
    if (last(array) instanceof Function) {
        comparator = diff.pop();
    }
    diff = diff.filter(isArray); 
    diff = concat([], ...diff);
    return array.filter(makeNotFunction(makeComaparatorArrayToOne(diff, comparator)));
}

function drop(array, n = 1) {
    return array.slice(n);
}

function dropRight(array, n = 1) { 
    return array.slice(0, (n == 0)? array.length:  -n);
}

function head(array) {
    return array[0];
}

function last(array) {
    return array[array.length - 1];
}

function flatten(array) { 
    let result = [];
    array.forEach((x)=>isArray(x)? result.push(...x): result.push(x));
    return result;
}
