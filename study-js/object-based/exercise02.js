let o = {
    full_name: "jack bauer",
    salary: 100_000,
    iban: "tr1",
    departments: ["IT", "HR"],
    style: "FULL_TIME",
    sayHello: function () {
        console.log(`Hello ${this.full_name}!`);
    }
}
console.log(o);
delete o.style;
console.log(o);
o.sayHello();