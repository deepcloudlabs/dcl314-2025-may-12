function fun(numbers){
    console.log("fun() function called.")
    let evens = [];
    for (let number of numbers) {
        if (number % 2 === 0) {
            evens.push(number);
        }
    }
    console.log("fun() returns.")
    return evens;
}

let result = fun([1,2,3,4,5,6,7,8,9,10]);
console.log(result);
