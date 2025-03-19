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
console.log(orderConfirmation);
