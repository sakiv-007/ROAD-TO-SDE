let car = {
    make: "Toyota",
    model: "Camry",
    year: 2020,

    start: function (){
        return `${this.make} car got started in ${this.year}`;
    },
};
// console.log(car.start());

function Person(name, age) {
this.name =  name
this.age = age
}

let john = new Person("John Doe", 20)
// console.log(john.name, john.age);


function Animal(type)
{
    this.type =  type
}


Animal.prototype.speak = function()
{
    return `${this.type} makes a sound`
}


Array.prototype.vikas = function () {
    return `Custom method ${this}`;
};

let myArray = [1,2,3];
// console.log(myArray.vikas());
let myNewArray = [1,2,3,4,5,6];
// console.log(myNewArray.vikas());



class vehicle {
    constructor (make, model){
        this.make = make,
        this.model =  model
}

start(){
    return `${this.model} is a car from ${this.make}`
}
}

class Car extends vehicle {
    drive() {
        return `${this.make} : This is an Inheritance Exmaple`
    }
}

let myCar =  new Car("Toyota", "Corolla")
// console.log(myCar.start());
// console.log(myCar.drive());


let vehOne =  new vehicle("Toyota", "Corolla")
// console.log(vehOne.make);







//Encapsulation

class BankAccount {
    #balance = 0;

    deposit(amount){
        this.#balance += amount
        return this.#balance
    }
    getBalance(){
        return `$ ${this.#balance}`
    }
}

let account = new BankAccount();
// console.log(account.getBalance());









// Abstraction 


class CoffeeMachine {
    start() {
        // call DB
        // filter value  etc etc

        return `Starting the machine...`
    }
    brewCoffee(){
        //complex calculations
        return `Brewing coffee....`
    }

    pressStartButton(){
        let msgOne = this.start()
        let msgTwo = this.brewCoffee()
        return `${msgOne} + ${msgTwo}`
    }
}

let myMachine =  new CoffeeMachine()
// console.log(myMachine.start());
// console.log(myMachine.brewCoffee());


// console.log(myMachine.pressStartButton());









// Polymorphism

class Bird {
    fly(){
        return `Flying...`
    }
}

class Penguin extends Bird {
    fly(){
        return `Penguins can't Fly`
    }
}

let bird =  new Bird()
let penguin =  new Penguin()
// console.log(bird.fly());
// console.log(penguin.fly());





// Static method

class Calculator {     // static functions can only be called by the class name
    static add(a,b)
    {
        return a+b;
    }
}
// let miniCalc = new Calculator()
// console.log(miniCalc.add(2,3));             this will throw the error


// console.log(Calculator.add(2,3));








// Getters and Setters

class Employee {
    #salary;
    constructor(name, salary)
    {
        if (salary < 0) {
            throw new Error(`"Salary can't be negative"`);
            
        }
        this.name =  name
        this.#salary = salary
    }

    get salary()
    {
        return `You are not allowed to see the Salary`
    }

    set salary(value)
    {
        if (value< 0) {
            {
                console.error("Invalid Salary");
                
            }
            
        }else {
            this._salary = value;
        }
    }
}
let emp = new Employee("Alice", -50000)
console.log(emp._salary);
emp.salary = 60000;