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
for (let field in o) { // reflection
    if (typeof (o[field]) !== "function")
        console.log(`${field}: ${o[field]}`);
}