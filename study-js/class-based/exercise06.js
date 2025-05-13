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

let kate1 = new Employee("1", "kate austen", 100_000, "tr1", ["IT", "HR"]);
/*
let full_name = kate.full_name;
let salary = kate.salary;
let iban = kate.iban;
*/
let {full_name, salary, iban,...restOfKate1} = kate1;
console.log(full_name, salary, iban);
console.log(restOfKate1);
let kate2 = {...kate1}; // shallow object cloning
kate2.departments = [...kate1.departments]; // array cloning
kate1.salary += 1000;
kate1.departments.push("FINANCE");
console.log(kate1);
console.log(kate2);
let [firstDepartment, secondDepartment, ...restOfDepts] = kate1.departments;
console.log(firstDepartment, secondDepartment);
console.log(restOfDepts); // ["FINANCE"]
