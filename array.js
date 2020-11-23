let _ = {}

function chunk(array, size = 1) {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

_.chunk = chunk;

function compact(array) {
    return array.filter((x)=>!!x);
}

_.compact = compact;

function isArray(a) {
    return a instanceof Array;  //stub
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
_.concat = concat;

function difference(array, ...diff) {
    diff = diff.filter(isArray);  // i dont like that, but for compatibility
    let diffset = new Set(concat([], ...diff));
    return array.filter((x)=>!diffset.has(x));
}

_.difference = difference;

// _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]
 
// The `_.property` iteratee shorthand.
// _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'); 
// _,property - implemented, but need more testing
// _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], (a)=>a.x); 

function differenceBy(array, ...diff) { 
    let iteratee = (x)=>x;
    let iteratee_ = diff.pop();
    if (isArray(iteratee_)) diff.push(iteratee_);
    else {
        if (typeof iteratee_ == "string") iteratee = (a)=>a[iteratee_];//shorthand expr - stub!
        else
            if (iteratee_ instanceof Function) iteratee = iteratee_;
    }
    diff = diff.filter(isArray); 
    diff = concat([], ...diff);
    
    let diffset = new Set(diff.map(iteratee));
    return array.filter((x)=>!diffset.has(iteratee(x)));
}

_.differenceBy = differenceBy;

// differenceWith - O(N*N)
// makeComaparatorArrayToOne - создает функцию компаратор, которая иститинна, если истинно хотябы одно сравнение финкцией comparatorOneToOne
function makeComaparatorArrayToOne(array, comparatorOneToOne) {  
    return function(one) {
        for (let i in array) {
            if (comparatorOneToOne(array[i], one)) return true;
        }
        return false;
    }
}

// makeNotFunction - на входе функция с возвращаемым значением логического типа, на выходе новая функция - логическая инверсия входной функции
function makeNotFunction(f) {
    return function(...args) {функция, 
        return !f(...args);
    }
}

function differenceWith(array, ...diff) { 
    let comparator = (x, y)=>x==y;
    if (diff[diff.length-1] instanceof Function) {
        comparator = diff.pop();
    }
    diff = diff.filter(isArray); 
    diff = concat([], ...diff);
    return array.filter(makeNotFunction(makeComaparatorArrayToOne(diff, comparator)));
}

_.differenceWith = differenceWith;

function drop(array, n = 1) {
    return array.slice(n);
}
_.drop = drop;

function dropRight(array, n = 1) {
    return array.slice(0, -n);
}
_.dropRight = dropRight;
