class Employee {
    constructor(identity, full_name, salary, iban, departments) {
        this.identity = identity;
        this.full_name = full_name;
        this.salary = salary;
        this.iban = iban;
        this.departments = departments;
/*        this.sayHello = this.sayHello.bind(this);
        this.increaseSalary = this.increaseSalary.bind(this);*/
    }

    sayHello = () => {
        console.log(this)
        console.log(`Hello ${this.full_name}!`);
    }

    increaseSalary = (percentage)=> {
        this.salary *= (1.0 + percentage / 100);
    }
}

let kate = new Employee("1234567890", "kate austen", 100_000, "tr1", ["IT", "HR"]);
kate.sayHello(); // sayHello(kate)
setInterval(kate.sayHello, 3000);
kate.salary = 10_000_000;
console.log(kate)