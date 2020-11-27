let lodash_cover_array = {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop, 
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
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

Object.assign(__, lodash_cover_array);


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

function dropRightWhile(array, predicate) {
    if (predicate == undefined) predicate = (val, index, arr) => !!val;
    let n_to_drop = 0;
    for (let i = array.length - 1; i >= 0 ; i--) {
        if  (!predicate(array[i], i, array)) break;
        n_to_drop ++;    
    }
    return dropRight(array, n_to_drop);
}

function dropWhile(array, predicate) {
    if (predicate == undefined) predicate = (val, index, arr) => !!val;
    let n_to_drop = 0;
//    for (let i in array) { -- it does not work with undefined(empty) values in array
    for (let i = 0; i < array.length; i++) {
        if  (!predicate(array[i], i, array)) break;
        n_to_drop ++;    
    }
    return drop(array, n_to_drop);
}

function fill(array, value, start = 0, stop = array.length) {
    start = _toInt(start, 0, array.length);
    stop = _toInt(stop, 0, array.length);
    for (let i = start; i < stop; i++) array[i] = value;
    return array;
}

function findIndex(array, callback, fromIndex = 0) {
    if (callback == undefined) {
        callback = (x) => !!x;
    }
    fromIndex = _toInt(fromIndex, 0, array.length);
    callback = createCallback(callback);
    for (let i = fromIndex; i < array.length; i++) 
        if (callback(array[i])) return i;
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

//---- some utils

function createCallback(c, thisArg) { //todo: thisArg does not wor
    if (typeof c == "string") {
        return function(x) {
            return x[c];
        }
    }
    if (typeof c == "object") {
        if (!isArray(c)) {
            return function(x) {
                for (let k in c) {
                    if (c[k] != x[k]) return false;
                }
                return true;
            }
        } else {
            return function(x) {
                return x[c[0]] == c[1];
            }
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

