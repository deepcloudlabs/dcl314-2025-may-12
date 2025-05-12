numbers = [4, 8, 42, 16, 23, 15];
console.log(numbers);
let numberOrderAsc = function(x, y){
    if (x < y){
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
};
numbers.sort(numberOrderAsc)
console.log(numbers);
