function gun(numbers){
    console.log("gun() function called.")
    let evens = [];
    for (let number of numbers) {
        if (number % 2 === 0) {
            evens.push(number);
        }
    }
    console.log("gun() returns.")
    return evens;
}

for (let even_number of gun([1,2,3,4,5,6,7,8,9,10])) {
    console.log(`[for] ${even_number}`);
}