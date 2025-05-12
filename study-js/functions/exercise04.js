function fun(x=5, y=6, z=7) {
    return x * y + z;
}

console.log(fun());
console.log(fun(3));
console.log(fun(3, 4));
console.log(fun(3, 4, 5));
console.log(fun(3, 4, 5, 6));