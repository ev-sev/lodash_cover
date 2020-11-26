let lodash_array = {
// implementation based on lodash version 1.3.1 
    compact,
    difference,
    drop,
    findIndex,
/*    first,
    flatten,
    head,
    indexOf,
    initial,
    intersection,
    last,
    lastIndexOf,
    object,
    range,
    rest,
    sortedIndex,
    tail,
    take,
    union,
    uniq,
    unique,
    unzip,
    without,
    zip,
    zipObject,*/
}

Object.assign(__, lodash_array);

//---- version 1.3.1

function compact(array) {
    return array.filter((x)=>!!x);
}

function difference(array, ...diff) {
    diff = diff.filter(isArray); 
    let diffset = new Set(concat([], ...diff));
    return array.filter((x)=>!diffset.has(x));
}

function drop(array, n) {
    if (drop.arguments.length == 1) n = 1;
    return array.slice(_toInt(n, 0));
}


function findIndex(array, callback) {
//    if (thisArg instanceof Object) callback = callback.bind(thisArg);
    for (let i in array) 
        if (callback(array[i])) return +i;
    return -1;
}

function first(array) {
    return array[0];
}

//---- se utils

function _toInt(n, minBound, maxBound) {
    n = parseInt(n);
    if (minBound !== undefined) n = (n > minBound)? n: minBound;
    if (maxBound !== undefined) n = (n < maxBound)? n: maxBound;
    return n;
}

function isArray(a) {
    return a instanceof Array;  //stub, todo: move to utils
}

function concat(...v) {
    let result = [];
    v.forEach((x)=>isArray(x)? result.push(...x): result.push(x));
    return result;
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
