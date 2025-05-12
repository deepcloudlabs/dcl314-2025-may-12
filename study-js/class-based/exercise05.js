class Employee {
    constructor(identity, full_name, salary, iban, departments) {
        this.identity = identity;
        this.full_name = full_name;
        this.salary = salary;
        this.iban = iban;
        this.departments = departments;
    }

    sayHello() {
        console.log(`Hello ${this.full_name}!`);
    }

    increaseSalary(percentage) {
        this.salary *= (1.0 + percentage / 100);
    }
}

let kate = new Employee("1", "kate austen", 100_000, "tr1", ["IT", "HR"]);
let jack = new Employee("2", "jack bauer", 200_000, "tr2", ["SALES"]);
console.log(kate.hasOwnProperty("identity"));
console.log(kate.hasOwnProperty("photo"));
Employee.prototype.photo = "photo.jpg";
console.log(jack.photo);
console.log(kate.photo);
kate.photo = "kate-photo.jpg";
console.log(jack.photo);
console.log(kate.photo);
console.log(kate.hasOwnProperty("photo"));
console.log(jack.hasOwnProperty("photo"));
delete Employee.prototype.photo;
