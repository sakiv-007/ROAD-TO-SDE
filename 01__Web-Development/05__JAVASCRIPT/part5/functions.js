/* 
1. Write a function named 'makeTea' that takes one pearameter 'typeOfTea', and returns a string like '"Making grren tea"' when called with '"green tea". Store the result in a variable named  'teaOrder'.

 */

function makeTea(typeOfTea){
    return `Making ${typeOfTea}`
}
let teaOrder = makeTea("lemon tea")
// console.log(teaOrder);

/* 
2. Create a function named orderOfTea that take one parameter teatype inside this functiion crate another function named confirmOrder that returns a message like order confirmed for chai 
Call confirmorder from within orderTea and return the result

 */
function orderTea(teaType){
    function confirmOrder(){
        return `Order confirmed for chai`
    }
    return confirmOrder()
}

let orderConfirmation = orderTea("chai")
// console.log(orderConfirmation);

/* 
3. Write an arrow function named calculateTotal that takes two parameters price and quantity. the function should return the total cost by multiplying the price and quantity
Store the result in a variable named totalCost

 */
const calculateTotal = (price, quantity) => {
    return price * quantity
}
let totalCost = calculateTotal(499 , 10)
// console.log(totalCost);


/* 
4. Write a function named processTeaOrder that takes another function makeTea as parameter and calls it eith the argument "earl grey"
Return the result of calling makeTea

 */
function makeTea(typeOfTea){
    return `maketea: ${typeOfTea}`
}

function processTeaOrder(teaFunction){
    return teaFunction("earl grey")
}

let order = processTeaOrder(makeTea)
// console.log(order);


/* 
5. Write a function named createTeaMaker that returns another function the retuner function should take one parameter teaType and return a message like "making grren tea "

store the returned function ina a variable named teaMaker and call it with green tea

 */
function createTeaMaker(){
    return function (teaType){
        return`Making ${teaType}`
    }
}

let teaMaker = createTeaMaker();
console.log(teaMaker("grren tea"));
