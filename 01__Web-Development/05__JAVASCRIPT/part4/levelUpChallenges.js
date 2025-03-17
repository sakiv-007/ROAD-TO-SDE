// 1. Write a 'for' loop that loops through the array ' ["green tea", "black tea", "chai", "oolong tea"]' and stops when it finds "chai"
      // store all teas before '"chai"' in a new array named 'selectedTeas'.

let teas = ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];

for (let i = 0; i < teas.length; i++) {
    if (teas[i] === "chai") {
        break; 
    }  
    selectedTeas.push(teas[i])  
}
// console.log(selectedTeas);



// 2. Write a 'for' loop that loops through the array '["London", "New York", "Paris", "Berlin"] and skips '"Paris"' .
    // Store the other cities in a new array named 'visitedCities'.

    let cities = ["London", "New York", "Paris", "Berlin"];
    let visitedCities = []

    for (let i = 0; i < cities.length; i++) {
       if (cities[i] === "Paris") {
        continue;
        
       }
       visitedCities.push(cities[i])  
    }
 console.log(visitedCities);
 

// 3. Use a 'for-of' loop to iterate through the  arrray '[1,2,3,4,5]' and stop when the number '4' is found. 
    // Store the numbers before '4' in an array named 'smallNumbers'.



// 4.use a 'for-of' loop to iterate thorugh the array '["chai","green tea", "herbal tea", "black tea"] and skip "herbal tea".
    // Store the other teas in an array named 'preferedTeas'.

    