let x = 2 + "2"; // concat
console.log(x);
let y = "2" * "2";
console.log(y);
let z = "two" * "iki";
console.log(z);
z = 0 * z;
console.log(z);
if (z !== z) {
    console.log("z holds NaN");
}
if (Number.isNaN(z)) {
    console.log("z holds NaN");
}
if (isNaN(z)) {
    console.log("z holds NaN");
}