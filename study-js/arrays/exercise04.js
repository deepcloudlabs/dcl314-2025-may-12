numbers = [4, 8, 42, 16, 23, 15];
console.log(numbers);
let numberOrderAsc = function(x, y){
    return x-y;
};
let numberOrderDesc = function(x, y){
    return y-x;
};
numbers.sort(numberOrderAsc)
console.log(numbers);
numbers.sort(numberOrderDesc)
console.log(numbers);
