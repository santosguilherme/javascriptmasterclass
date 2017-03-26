var cars = [];
 
cars[0] = {model: "Ka", price: 28800};
cars[1] = {model: "Corsa", price: 34750};
cars[2] = {model: "Palio", price: 32000};

var total = cars.reduce(function (acumulado, car) {
	return acumulado + car.price;
}, 0);
console.log(total);