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
    findLastIndex,
    flatten,
    flattenDeep,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    intersectionBy,
    intersectionWith,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAt,
    remove,
    reverse,
/*    object,
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

function difference(...arrays) {
    function difference2(array1, array2) {
        if (!isArray(array1)) return [];
        if (!isArray(array2)) return array1;
        let set2 = new Set(array2);
        return array1.filter((x)=>!set2.has(x));
    };
    return arrays.reduce(difference2);
}

function differenceBy(array, ...diff) {
    let callback;
    if (!isArray(last(diff))) {
        callback = createCallback(diff.pop());
    } else
        return difference(array, ...diff);

    let diffset = new Set();
    diff.forEach(x=>isArray(x)? x.forEach(y=>diffset.add(y)): x = x);

    return array.filter((x)=>!diffset.has(callback(x)));
}

function differenceWith(...arrays) {
    if (isArray(last(arrays)) || !isFunction(last(arrays))) return difference(...arrays);
    let comparator = arrays.pop();

    function differenceWith2(array1, array2, cmp) {
        if (!isArray(array1)) return [];
        if (!isArray(array2)) return array1;

        return array1.filter((x) => array2.every((y) => !comparator(x, y)));        
    }

    return arrays.reduce((a, b) => differenceWith2(a, b, comparator));
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

function findLastIndex(array, callback, fromIndex = array.length - 1) {
    if (callback == undefined) {
        callback = (x) => !!x;
    }
    fromIndex = _toInt(fromIndex, 0, array.length);
    callback = createCallback(callback);
    for (let i = fromIndex; i >= 0; i--) 
        if (callback(array[i])) return i;
    return -1;
}

function flatten(array) { 
    return flattenDepth(array);
}

function flattenDeep(array) {
    return flattenDepth(array, Infinity);
} 

function flattenDepth(array, n = 1) {
    n = _toInt(n, 0);
    if (n == 0) return array;

    let rv = [];
    
    for (let i = 0; i < array.length; i++) {
        if (isArray(array[i])) {
            rv.push(...flattenDepth(array[i], n - 1));
        } else rv.push(array[i]);
    }
    return rv;
} 

function fromPairs(array) {
    let obj = {};
    for (let i of array) {
        obj[i[0]] = i[1];
    }
    return obj;
}

function head(array) {
    return array[0];
}

function indexOf(array, value, fromIndex = 0) {
    return findIndex(array, (x)=>x===value, fromIndex);
}

function initial(array) {
    if (isArray(array)) return array.slice(0, array.length - 1);
    return [];
}

function intersection(...arrays) {
    if (!isArray(arrays[0])) return [];
    function intersection2(a1, a2) {
        if (!isArray(a2)) return [];
        let set2 = new Set(a2);
        return a1.filter((x)=>set2.has(x));
    }
    return arrays.reduce(intersection2);
}

function intersectionBy(...arrays) {
    let callback;
    if (!isArray(last(arrays))) {
        callback = createCallback(arrays.pop());
    } else
        callback = (x) => x;

    if (!isArray(arrays[0])) return [];
    let firstArray = arrays.shift();
    let setFA = new Set;
    let arrayOfSets = arrays.map(x => new Set(x.map(callback))); 

    let rv = [];
    for (let i in firstArray) {
        let v = callback(firstArray[i]);
        if (setFA.has(v)) continue;
        if (all(arrayOfSets, (y)=>y.has(v))) {
            rv.push(firstArray[i]);
        }
        setFA.add(v);
    }
    return rv;
}

function intersectionWith(...arrays) {
    function intersectionWith2(arr1, arr2, cmp) {
//        if (arr1 == arr2) return arr1;
        if (!(arr1 && arr2)) return [];
        arr2 = arr2.filter((x)=>true); // remove empty elements
        let rv = [];
        for (let x of arr1) {
            let arr2_ = arr2.filter((y)=>!cmp(x, y));
            if (arr2.length != arr2_.length) {
                arr2 = arr2_;
                rv.push(x);
            }
        }
        return rv;
    }
    if (!isFunction(last(arrays))) return difference(...arrays);
    let cmp = arrays.pop();
    return arrays.reduce((a,b)=>intersectionWith2(a, b, cmp));
}

function join(array, separator = ',') {
    return array.join(separator);
}

function last(array) {
    return array[array.length - 1];
}

function lastIndexOf(array, value, fromIndex=array.length-1) {
    return findLastIndex(array, (x)=>x==value, fromIndex);
}

function nth(array, n = 0) {
    n = _toInt(n);
    if (n >= array.length) return undefined;
    if (n < -array.length) return undefined;
    if (n >= 0) return array[n];
    return array[array.length + n];
}

function pull(array, ...values) {
    return pullAll(array, values);
}

function pullAll(array, values) {
    let valuesToRemove = new Set(values);
    for (let i = array.length - 1; i >= 0; i--) {
        if (valuesToRemove.has(array[i])) array.splice(i, 1);
    }
    return array;
}

function pullAllBy(array, values, iteratee = identity) {
    iteratee = createCallback(iteratee);
    let valuesToRemove = new Set(values.map(iteratee));
    for (let i = array.length - 1; i >= 0; i--) {
        if (valuesToRemove.has(iteratee(array[i]))) array.splice(i, 1);
    }
    return array;
}

function pullAllWith(array, values, comparator = (x, y) => x == y) {
    return pullAll(array, intersectionWith(array, values, comparator));
}

function pullAt(array, ...indexes) {
    indexes = flattenDeep(indexes).map(x=>_toInt(x));
    let pulled = indexes.map(i=>array[i]);
    indexes.sort((a, b) => b - a);
    indexes.forEach((x)=>array.splice(x, 1));
    return  pulled;
}

function remove(array, predicate = identity) {
    let rv = array.filter(predicate);
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) array.splice(i, 1);
    }
    return rv;
}

function reverse(array) {   // just for fun 
    for (let i = 0, j = array.length - 1; i < j; i++, j--) {
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
    return array;
}

///---- some utils

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

function identity(x) {
    return x;
}

function _toInt(n, minBound = Number.MIN_SAFE_INTEGER, maxBound = Number.MAX_SAFE_INTEGER) {
    if (n === NaN) return n;
    if (n === Infinity) return Infinity;
    if (n === -Infinity) return -Infinity;

    n = parseInt(n);
    n = (n > minBound)? n: minBound;
    n = (n < maxBound)? n: maxBound;
    return n;
}

function isArray(a) {
    return a instanceof Array;  //stub
}

function isFunction(f) {
    return f instanceof Function;
}

//---- logic utils

function all(arr, predicate) { // if all elements of arr match predicate
    for (let i = 0; i < arr.length; i++) {
        if (!predicate(arr[i])) return  false;
    }
    return  true;
}

function notPredicate(predicate) {
    return function(...args) {
        return !predicate(...args);
    }
}

function atLeastOne(arr, predicate) { // return true if at least one match the predicate
    return !all(arr, notPredicate(predicate));
} 

function noOne(arr, predicate) {
    return !atLeastOne(arr, predicate);
}

//--- logic utils end
