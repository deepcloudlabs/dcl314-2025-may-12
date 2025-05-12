function fun(x, y, z) {
   for (let arg of arguments)
       console.log(arg);
    if (arguments.length !== 3)
        throw new Error(`Invalid number of arguments: expected 3, got ${arguments.length}!`);
    return x * y + z;
}

console.log(fun(1, 2, 3));
console.log(fun(3, 1, 1));
console.log(fun(3, 4, 5));
console.log(fun(3, 4, 5));
console.log(fun(3, 4, 5));