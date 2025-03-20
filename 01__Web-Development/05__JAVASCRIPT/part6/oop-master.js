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
console.log(myCar.start());
console.log(myCar.drive());


let vehOne =  new vehicle("Toyota", "Corolla")
console.log(vehOne.make);
