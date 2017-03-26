var cars = [];
 
cars[0] = {model: "Ka", price: 28800};
cars[1] = {model: "Corsa", price: 34750};
cars[2] = {model: "Palio", price: 32000};

var carsIndex = cars.reduce(function (acumulado, car) {
	acumulado[car.model] = car;
	return acumulado;
}, {});
console.log(carsIndex);