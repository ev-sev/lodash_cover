let _lazy = {
    forwardIterable,
};

function lazyIterable() {
    function* filter(func) {
        for (let v of this) {
            if (func(v)) yield v;
        }
    }
    function* map(func) {
        for (let v of this) {
            yield func(v);
        }
    }
    function* take(num) {
        for (let v of this) {
            yield v;
            if (--num <= 0) break;
        }
    }
    return Object.assign(this, {filter, map, take});
}

function forwardIterable(array, begin = 0, end = -1) {
    let len = array.length;
    begin = (begin < 0)? len + begin: begin;
    end = (end < 0)? len + end: end;
    if (end >= len) end = len - 1;
    let iter = begin;
    return Object.assign(new lazyIterable, {
        [Symbol.iterator]() {
//            iter = begin;
            return {
                next() {
                    return {
                        value: array[iter],
//                       key: iter,
//                        src: array,
                        done: (iter++ >= end)
                    }
                }
            }
        },
        clone() {
            return forwardIterable(array, iter, end);
        }
    });
}