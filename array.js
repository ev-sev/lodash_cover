let lodash_array = {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop, 
    dropRight,
//    findIndex,
    first,
    flatten,
/*     head,
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

function chunk(array, n) {
    n = _toInt(n, 0);
    if (n == 0) return [];
    let rv = [];
    for(let i = 0; i < array.length; i += n) {
        rv.push(array.slice(i, i + n));
    }
    return rv;
} 

function compact(array) {
    return array.filter((x)=>!!x);
}

function concat(...v) {
    let result = [];
    v.forEach((x)=>isArray(x)? result.push(...x): result.push(x));
    return result;
}

function difference(array, ...diff) {
    diff = diff.filter(isArray); 
    let diffset = new Set(concat([], ...diff));
    return array.filter((x)=>!diffset.has(x));
}

function differenceBy(array, ...diff) {
    let callback;
    if (!isArray(last(diff))) {
        callback = createCallback(diff.pop());
    }
    diff = concat(...diff.filter(isArray));

    if (callback) diff = diff.map(callback);
    else callback = (x) => x;
    let diffset = new Set(diff);
    return array.filter((x)=>!diffset.has(callback(x)));
}

function differenceWith(array, ...diff) {
    if (isArray(last(diff))) return difference(array, ...diff);
    let comparator = diff.pop();
    if (!isFunction(comparator)) return difference(array, ...diff);

    diff = concat(...diff.filter(isArray));

    function atLeastOne(x, arr, cmp) {
        for (let i in arr) {
            if (cmp(x, arr[i])) return true;
        }
        return false;
    }

    return array.filter((x) => !atLeastOne(x, diff, comparator));

}

function drop(array, n) {
    if (drop.arguments.length == 1) n = 1;
    return array.slice(_toInt(n, 0));
}

function dropRight(array, n) { 
    if (dropRight.arguments.length == 1) n = 1;
    return array.slice(0, array.length - _toInt(n, 0, array.length));
}


function findIndex(array, callback, thisArg) { //todo: thisArg does not work
    callback = createCallback(callback, thisArg);
    for (let i in array) 
        if (callback(array[i])) return +i;
    return -1;
}

function first(array, callback, thisArg) {  //todo: thisArg does not work
    if (first.arguments.length == 1) return array[0];
    if (typeof callback == "number") {
        let n = _toInt(callback);
        if (n <= 1) return array[0];
        return array.slice(0, n);
    }
    callback = createCallback(callback, thisArg);
    for (let i in array) {
        if (callback(array[i])) continue;
        return array.slice(0, i);
    }
    return array[0];
}

function flatten(array) { 
    let result = [];
    array.forEach((x)=>isArray(x)? result.push(...x): result.push(x));
    return result;
}

//---- se utils

function createCallback(c, thisArg) { //todo: thisArg does not wor
    if (typeof c == "string") {
        return function(x) {
            return x[c];
        }
    }
    if (typeof c == "object") {
        return function(x) {
            for (let k in c) {
                if (c[k] != x[k]) return false;
            }
            return true;
        }
    }
    return c;
}


function _toInt(n, minBound = Number.MIN_SAFE_INTEGER, maxBound = Number.MAX_SAFE_INTEGER) {
    n = parseInt(n);
    n = (n > minBound)? n: minBound;
    n = (n < maxBound)? n: maxBound;
    return n;
}

function isArray(a) {
    return a instanceof Array;  //stub, todo: move to utils
}

function isFunction(f) {
    return f instanceof Function;
}

function head(array) {
    return array[0];
}

function last(array) {
    return array[array.length - 1];
}

