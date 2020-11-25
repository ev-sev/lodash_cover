let lodash_array = {
    chunk,
    compact,
//    concat,
    difference,
//    differenceBy,
//    differenceWith,
    findIndex,        //Need to realise createCllback
//    first,
    drop,
    dropRight,
    head,
    last,
    flatten,
}

Object.assign(__, lodash_array);


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
// makeComaparatorArrayToOne - Ã‘ÂÃÂ¾ÃÂ·ÃÂ´ÃÂ°ÃÂµÃ‘â€š Ã‘â€žÃ‘Æ’ÃÂ½ÃÂºÃ‘â€ ÃÂ¸Ã‘Å½ ÃÂºÃÂ¾ÃÂ¼ÃÂ¿ÃÂ°Ã‘â‚¬ÃÂ°Ã‘â€šÃÂ¾Ã‘â‚¬, ÃÂºÃÂ¾Ã‘â€šÃÂ¾Ã‘â‚¬ÃÂ°Ã‘Â ÃÂ¸Ã‘ÂÃ‘â€šÃÂ¸Ã‘â€šÃÂ¸ÃÂ½ÃÂ½ÃÂ°, ÃÂµÃ‘ÂÃÂ»ÃÂ¸ ÃÂ¸Ã‘ÂÃ‘â€šÃÂ¸ÃÂ½ÃÂ½ÃÂ¾ Ã‘â€¦ÃÂ¾Ã‘â€šÃ‘ÂÃÂ±Ã‘â€¹ ÃÂ¾ÃÂ´ÃÂ½ÃÂ¾ Ã‘ÂÃ‘â‚¬ÃÂ°ÃÂ²ÃÂ½ÃÂµÃÂ½ÃÂ¸ÃÂµ Ã‘â€žÃÂ¸ÃÂ½ÃÂºÃ‘â€ ÃÂ¸ÃÂµÃÂ¹ comparatorOneToOne
function makeComaparatorArrayToOne(array, comparatorOneToOne) {  
    return function(one) {
        for (let i in array) {
            if (comparatorOneToOne(array[i], one)) return true;
        }
        return false;
    }
}

// makeNotFunction - ÃÂ½ÃÂ° ÃÂ²Ã‘â€¦ÃÂ¾ÃÂ´ÃÂµ Ã‘â€žÃ‘Æ’ÃÂ½ÃÂºÃ‘â€ ÃÂ¸Ã‘Â Ã‘Â ÃÂ²ÃÂ¾ÃÂ·ÃÂ²Ã‘â‚¬ÃÂ°Ã‘â€°ÃÂ°ÃÂµÃÂ¼Ã‘â€¹ÃÂ¼ ÃÂ·ÃÂ½ÃÂ°Ã‘â€¡ÃÂµÃÂ½ÃÂ¸ÃÂµÃÂ¼ ÃÂ»ÃÂ¾ÃÂ³ÃÂ¸Ã‘â€¡ÃÂµÃ‘ÂÃÂºÃÂ¾ÃÂ³ÃÂ¾ Ã‘â€šÃÂ¸ÃÂ¿ÃÂ°, ÃÂ½ÃÂ° ÃÂ²Ã‘â€¹Ã‘â€¦ÃÂ¾ÃÂ´ÃÂµ ÃÂ½ÃÂ¾ÃÂ²ÃÂ°Ã‘Â Ã‘â€žÃ‘Æ’ÃÂ½ÃÂºÃ‘â€ ÃÂ¸Ã‘Â - ÃÂ»ÃÂ¾ÃÂ³ÃÂ¸Ã‘â€¡ÃÂµÃ‘ÂÃÂºÃÂ°Ã‘Â ÃÂ¸ÃÂ½ÃÂ²ÃÂµÃ‘â‚¬Ã‘ÂÃÂ¸Ã‘Â ÃÂ²Ã‘â€¦ÃÂ¾ÃÂ´ÃÂ½ÃÂ¾ÃÂ¹ Ã‘â€žÃ‘Æ’ÃÂ½ÃÂºÃ‘â€ ÃÂ¸ÃÂ¸
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

function findIndex(array, callback) {
    for (let i in array) 
        if (callback(array[i])) return i;
    return -1;
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
