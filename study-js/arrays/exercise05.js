numbers = [4, 8, 42, 16, 23, 15];
console.log(numbers);
let numberOrderAsc = (x, y) => x - y;
let numberOrderDesc = (x, y) => y - x;
numbers.sort((x, y) => x - y);
console.log(numbers);
numbers.sort((x, y) => y - x);
console.log(numbers);
