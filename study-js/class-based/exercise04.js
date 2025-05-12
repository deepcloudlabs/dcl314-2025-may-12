class Employee {
    #identity;
    #full_name;
    #salary;
    #iban;
    #departments;
    constructor(identity, full_name, salary, iban, departments) {
        this.#identity = identity;
        this.#full_name = full_name;
        this.#salary = salary;
        this.#iban = iban;
        this.#departments = departments;
    }

    get salary() {
        return this.#salary;
    }

    set salary(value) {
        if (value < 24_000) throw new Error("Salary must be at least 24,000");
        if (value <= this.#salary) throw new Error("Salary must be higher than before");
        if (value > 300_000) throw new Error("Salary must be at most 100,000");
        this.#salary = value;
    }

    sayHello = () => {
        console.log(this)
        console.log(`Hello ${this.#full_name}!`);
    }

    increaseSalary = (percentage)=> {
        this.#salary *= (1.0 + percentage / 100);
    }
}

let kate = new Employee("1234567890", "kate austen", 100_000, "tr1", ["IT", "HR"]);
kate.sayHello(); // sayHello(kate)
setInterval(kate.sayHello, 3000);
console.log(kate.salary)
kate.salary = 10_000_000;