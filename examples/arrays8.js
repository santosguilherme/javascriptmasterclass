var cars = [];
 
cars[0] = {model: "Ka", price: 28800};
cars[1] = {model: "Corsa", price: 34750};
cars[2] = {model: "Palio", price: 32000};
  
cars.sort(function (a, b) {
  return b.price - a.price;
});

console.log(cars);