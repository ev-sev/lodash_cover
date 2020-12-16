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
    slice,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    union,
    unionBy,
    unionWith,
    uniq,
    uniqBy,
    uniqWith,
    without,
    xor,
    xorBy,
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

function slice(array, start = 0, end = array.length) {
    start = indexCast(array, start);
    end = indexCast(array.length, end - 1);
    let rv = [];
    for (let i = start; i <= end; i++) {
        rv.push(array[i]);
    }
    return rv;
}

function sortedIndex(array, value) {
    if (!isArray(array)) return 0;
    function _sortedIndex(start = 0, end = array.length) {
        if (start == end) return start;
        if (end - start == 1) {
            if (value <= array[start]) return start;
            return end;
        }
        let m = Math.floor((start + end) / 2);

        if (value > array[m]) return _sortedIndex(m, end);
        return _sortedIndex(start, m);
    }
    return _sortedIndex();
}

function sortedIndexBy(array, value, iteratee=identity) {
    if (!isArray(array)) return 0;
    if (iteratee === undefined) 
        return sortedIndex(array, value);
    iteratee = createCallback(iteratee);
    value = iteratee(value);
    function _sortedIndex(start = 0, end = array.length) {
        if (start == end) return start;
        if (end - start == 1) {
            if (value <= iteratee(array[start])) return start;
            return end;
        }
        let m = Math.floor((start + end) / 2);

        if (value > iteratee(array[m])) return _sortedIndex(m, end);
        return _sortedIndex(start, m);
    }
    return _sortedIndex();
}

function sortedIndexOf(array, value) {
    let si = sortedIndex(array, value);
    if (array[si] === value) return si;
    return -1;
}

function sortedLastIndex(array, value) {
    if (!isArray(array)) return 0;
    function _sortedLastIndex(start = 0, end = array.length) {
        if (start == end) return start;
        if (end - start == 1) {
            if (value < array[start]) return start;
            return end;
        }
        let m = Math.floor((start + end) / 2);

        if (value >= array[m]) return _sortedLastIndex(m, end);
        return _sortedLastIndex(start, m);
    }
    return _sortedLastIndex();
}

function sortedLastIndexBy(array, value, iteratee=identity) {
    if (!isArray(array)) return 0;
    if (iteratee === undefined) 
        return sortedIndex(array, value);
    iteratee = createCallback(iteratee);
    value = iteratee(value);
    function _sortedLastIndex(start = 0, end = array.length) {
        if (start == end) return start;
        if (end - start == 1) {
            if (value < iteratee(array[start])) return start;
            return end;
        }
        let m = Math.floor((start + end) / 2);

        if (value >= iteratee(array[m])) return _sortedLastIndex(m, end);
        return _sortedLastIndex(start, m);
    }
    return _sortedLastIndex();
}

function sortedLastIndexOf(array, value) {
    let si = sortedLastIndex(array, value);
    if (array[si - 1] === value) return si - 1;
    return -1;
}

function sortedUniq(array) {
    if (!isArray(array)) return [];
    if (array.length == 0) return [];
    let v = array[0];
    let rv = [];
    rv.push(v);
    for (let i = 1; i < array.length; i++) {
        if (v == array[i]) continue;
        v = array[i];
        rv.push(v);
    }
    return rv;
}

function sortedUniqBy(array, iteratee=identity) {
    if (!isArray(array)) return [];
    if (array.length == 0) return [];
    iteratee = createCallback(iteratee);

    let rv = [];
    rv.push(array[0]);
    let v = iteratee(array[0]);
    for (let i = 1; i < array.length; i++) {
        let vi = iteratee(array[i]);
        if (v == vi) continue;
        rv.push(array[i]);
        v = vi;
    }
    return rv;
}

function tail(array) {
    if(!isArray(array)) return [];
    let rv = [];
    for (let i = 1; i < array.length; i++) rv.push(array[i]);
    return rv;
}

function take(array, n = 1) {
    n = (n < 0)? 0: n > array.length? array.length: n;
    let rv = [];
    for (let i = 0; i < n; i++) 
        rv.push(array[i]);
    return rv;
}

function takeRight(array, n = 1) {
    n = (n < 0)? 0: n > array.length? array.length: n;
    let rv = [];
    for (let i = array.length - n; i < array.length; i++) 
        rv.push(array[i]);
    return rv;
}

function takeRightWhile(array, predicate = identity) {
    predicate = createCallback(predicate);
    let rv = [];
    let n = 0;
    for (let i = array.length - 1; i >= 0 && predicate(array[i]); i--) n++;
    return takeRight(array, n);
}

function takeWhile(array, predicate = identity) {
    predicate = createCallback(predicate);
    let rv = [];
    let n = 0;
    for (let i = 0; i < array.length && predicate(array[i]); i++) n++;
    return take(array, n);
}

function union(...arrays) { 
    return uniq(concat(...arrays));
}

function unionBy(...arrays) { 
    if (isArray(last(arrays))) 
        return union(...arrays);
    let f = arrays.pop();
    return uniqBy(concat(...arrays), f);  
}

function unionWith(...arrays) { 
    if (isArray(last(arrays))) 
        return union(...arrays);
    let f = arrays.pop();
    return uniqWith(concat(...arrays), f);  
}

function uniq(array) {
    let s = new Set();
    let rv = [];
    for (let v of array) {
        if (!s.has(v)) {
            rv.push(v);
            s.add(v);
        }
    }
    return rv;
}

function uniqBy(array, iteratee = identity) {
    let s = new Set();
    iteratee = createCallback(iteratee);
    let rv = [];
    for (let v of array) {
        let vi = iteratee(v);
        if (!s.has(vi)) {
            rv.push(v);
            s.add(vi);
        }
    }
    return rv;
}

function uniqWith(array, comparator = isEqual) {
    function arrayFilter(a) {
        if (a.length == 0) return undefined;
        let v = a[0];
        let rv = [];
        for (let i = 1; i < a.length; i++) 
            if (!comparator(v, a[i])) rv.push(a[i]);
        return [v, rv];
    }
    let rv = []; 
    for (; ; ) {
        let b = arrayFilter(array);
        if (!b) break;
        rv.push(b[0]);
        array = b[1];
    }
    return rv;
}

function without(array, ...values) {
    return difference(array, values);
}

function xor(...arrays) {
    let sets = arrays.filter(isArray).map(x => new Set(x));
    let rv = [];
    for (let i = 0; i < sets.length; i++) {
        b: for (let v of sets[i]) {
            for (let j = 0; j < sets.length; j++) {
                if (i == j) continue;
                if (sets[j].has(v)) continue b;
            }
            rv.push(v);
        }
    }
    return rv;
}

function xorBy(...arrays) {
    if (isArray(last(arrays))) return xor(arrays);
    let iteratee = createCallback(arrays.pop());
    let m = new Map();
    for (let a of arrays) {
        for (let v of a) {
            let itv =iteratee(v);
            if (!m.has(itv)) {
                m.set(itv, [v, a, 1]);
            } else {
                let me = m.get(itv);
                if (me[1] != a) {
                    me[2] ++;
                    m.set(itv, me);
                }
            }
        }
    }
    let rv = [];
    m.forEach((x)=> {if (x[2] == 1) rv.push(x[0])});
    return rv;
}

function xorWith(...arrays) {
    if (isArray(last(arrays))) return xor(arrays);
    let comparator = arrays.pop();
    arrays = arrays.map(x=>uniqWith(x, comparator))
    let rv = [];
    for (let i = 0; i < arrays.length; i++) {
        b: for (let v of arrays[i]) {
            for (let j = 0; j < arrays.length; j++) {
                if (i == j) continue;
                for (let k of arrays[j])
                    if (comparator(v, k)) continue b;
            }
            rv.push(v);
        }
    }
    return rv;
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

function indexCast(array, idx) {
    let len = array.length;
    if (idx >= len) return len - 1;
    if (idx < 0) return Math.max(len + idx, 0);
    return idx;
}

function makeUniqPredicate(array) {
    let s = new Set(array);
    return (x) => s.has(x); 
}

function isEqual(a, b) {  // stub
    return a == b;
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
