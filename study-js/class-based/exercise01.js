let Employee = function(identity,full_name,salary,iban,departments) {
    this.identity = identity;
    this.full_name = full_name;
    this.salary = salary;
    this.iban = iban;
    this.departments = departments;
    this.sayHello = function() {
        console.log(`Hello ${this.full_name}!`);
    }
    this.increaseSalary = function(percentage) {
        this.salary *= (1.0 + percentage / 100);
    }
}

let kate = new Employee("1234567890", "kate austen", 100_000, "tr1", ["IT", "HR"]);
kate.sayHello();
kate.increaseSalary(50);
console.log(kate)