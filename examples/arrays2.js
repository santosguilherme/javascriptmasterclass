var cars = [];
 
cars[0] = {model: "Ka", price: 28800};
cars[1] = {model: "Corsa", price: 34750};
cars[2] = {model: "Palio", price: 32000};

var total = 0;
cars.forEach((car) => total+= car.price);
console.log(total);