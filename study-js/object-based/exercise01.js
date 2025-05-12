let o = {}
o.full_name = "jack bauer";
o.salary = 100_000;
o.iban = "tr1";
o.departments = ["IT", "HR"];
o.style = "FULL_TIME";
o.sayHello = function() {
    console.log(`Hello ${this.full_name}!`);
}

console.log(o);
o.sayHello();