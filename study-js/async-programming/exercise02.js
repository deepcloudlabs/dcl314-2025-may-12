function gun(numbers){
    return new Promise((resolve,reject) => {
        if (!numbers)
            reject(new Error("You must provide an array of numbers."));
        console.log("fun() function called.")
        let evens = [];
        for (let number of numbers) {
            if (number % 2 === 0) {
                evens.push(number);
            }
        }
        console.log("fun() returns.")
        setTimeout(() => resolve(evens), 5_000);
    });
}
// Asynchronous Programming --> Observer
gun([1,2,3,4,5,6,7,8,9,10]).then( result => {
   console.log(`Received the result: ${result}`);
}).catch( err => {
   console.error(err);
}).finally(() =>{
    console.log("gun() is done!");
});
for (let i=0; i<1000; i++){
    console.log(i);
}
