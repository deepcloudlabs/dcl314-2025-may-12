numbers = [4,8,15,16,23,42];
// External Loop #1
for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    console.log(number);
}
// External Loop #2
for (let index in numbers) {
    let number = numbers[index];
    console.log(number);
}
// External Loop #3
for (let number of numbers) {
    console.log(number);
}
// Internal Loop => functional programming
numbers.forEach(function(number,index) {
    console.log(`numbers[${index}]: ${number}`);
});