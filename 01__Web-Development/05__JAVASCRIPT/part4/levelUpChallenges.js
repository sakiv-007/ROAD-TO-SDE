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
//  console.log(visitedCities);
 

// 3. Use a 'for-of' loop to iterate through the  arrray '[1,2,3,4,5]' and stop when the number '4' is found. 
    // Store the numbers before '4' in an array named 'smallNumbers'.

    let numbers = [1,2,3,4,5];
    let smallNumbers = []

for (const num of numbers) {
    if (num === 4) {
        break;
    }
        smallNumbers.push(num)
    }
// console.log(smallNumbers);


// 4.use a 'for-of' loop to iterate thorugh the array '["chai","green tea", "herbal tea", "black tea"] and skip "herbal tea".
    // Store the other teas in an array named 'preferedTeas'.

let teass = ["chai","green tea", "herbal tea", "black tea"];
let preferedTeas = []

for (const tea of teass) {
    if (tea === "Herbal tea" || tea === "herbal tea") {
        continue;
    }
    preferedTeas.push(tea)
}
// console.log(preferedTeas);


/* 
 5. Use a 'for-in' loop to loop through an object containing city population.
        stop the loop when the population of '"Berlin"' is found and store all previous cities population in a new object named 'cityPopulation'.

        let citiesPopulation = {
             "London" : 8900000,
             "New York" : 8400000,
             "Paris" : 2200000,
             "Berlin" : 3500000
        };

  */

        let citiesPopulation = {
            "London" : 8900000,
            "New York" : 8400000,
            "Paris" : 2200000,
            "Berlin" : 3500000
       };

       let cityNewPopulations = {};
    //    console.log(Object.keys(citiesPopulation));
    //    console.log(Object.values(citiesPopulation));
       

    for (const city in citiesPopulation) {
                // key = value 
                if (city == "Berlin") {
                    break;
                    
                }


            cityNewPopulations[city] = citiesPopulation[city] ;           
        }
    // console.log(cityNewPopulations);


/* 
6. Use a for-in loop to loop through ab object containing city populations.
        skip any city with a population below 3 million and store the rest in a new object named 'largeCities'.

        let worldCities = {
            "Sydney" : 5000000,
            "Tokyo" : 9000000,
            "Berlin" : 3500000,
            "Paris" : 2200000
         };

     */

         let worldCities = {
            "Sydney" : 5000000,
            "Tokyo" : 9000000,
            "Berlin" : 3500000,
            "Paris" : 2200000
         };

         let largeCities = {}

         for (const city  in worldCities) {
                if (worldCities[city] < 3000000) {
                    continue;
                }
                largeCities[city] = worldCities[city]
            }
        //  console.log(largeCities);
         
/* 
7. Write a forEach loop that iterated through the array '["early grey", "green tea", "chai" , "oolong tea"]'.
            stop the loop when "chai" is found and store all the previous tea types in an array named 'availableTeas'

          */

      let teaCollection =      ["early grey", "green tea", "chai" , "oolong tea"]
let availableTeas = []

teaCollection.forEach(function (tea) {
    if (tea === "chai") {
        return;   
    }
    availableTeas.push(tea)
});
// console.log(availableTeas);


            /* 
8. Write a forEach loop that iterated through the array '["Berlin", "Tokyo", "Sydney" , "Paris"]'.
            skip "Sydney" and store  the cities in a new array   named 'traveledCities'

          */
    let myworlCities = ["Berlin", "Tokyo", "Sydney" , "Paris"]
    let traveledCities = []

    myworlCities.forEach(function (city)  {
        if (city === "Sydney") {
            return;
        }
        traveledCities.push(city);
    });
    // console.log(traveledCities);
  
/*     
9. Write a for loop that iterates the aaray [2,5,7,9]
        skip the value '7' and multply the rest by 2. Store the rsults in a new array named 'doubleNumbers'
   */ 
  
        let myNumbers = [2,5,7,9]
        let doubleNumbers = []

       for (let i = 0; i < myNumbers.length; i++) {
        if (myNumbers[i] === 7) {
            continue
        }
        doubleNumbers.push(myNumbers[i] * 2)
       }
// console.log(doubleNumbers);


        /*     
10. use a for-of loop to iterate through the array ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"]

        and stop when the length of the current tea name is greater than 10.
        Store the teas iterated over in an array named 'shortTeas'
   */ 

let myTeas = ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"]
let shortTeas = []

for (const tea of myTeas) {
    if (tea.length > 10) {
        break
        
    }
    shortTeas.push(tea)
}
console.log(shortTeas);
