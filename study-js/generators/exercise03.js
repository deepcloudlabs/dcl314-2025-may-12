function* gun(numbers){
    console.log("gun() function called.")
    for (let number of numbers) {
        if (number % 2 === 0) {
            console.log(`[gun][yield] ${number}`);
            yield number;
        }
    }
    console.log("gun() returns.")
}

console.log("Application starts here.")
let generator = gun([1,2,3,4,5,6,7,8,9,10]);
let result = null;
do{
    result = generator.next();
    if (!result.done)
       console.log(result.value)
}while(!result.done);
console.log("Application ends here.")
