async function sun(numbers){
    console.log("sun() function called.")
    let evens = [];
    for (let number of numbers) {
        if (number % 2 === 0) {
            evens.push(number);
        }
    }
    console.log("sun() returns.")
    return evens;
}

sun([1,2,3,4,5,6,7,8,9,10]).then(result => {
    console.log(`sun() returns ${result}`);
}).catch(e => console.error(e))
    .finally(() => console.log("sun() finally finished."));
