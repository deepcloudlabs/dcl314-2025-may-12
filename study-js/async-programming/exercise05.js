async function run(numbers){
    let evens = [];
    for (let number of numbers) {
        if (number % 2 === 0) {
            evens.push(number);
        }
    }
    return evens;
}

async function tun(numbers){
    let result = await run([1,2,3,4,5,6,7,8,9,10])
    console.log(result)
}
