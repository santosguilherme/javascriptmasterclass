var cars = [];
 
cars[0] = {brand: "Ford", model: "Ka"};
cars[1] = {brand: "Chevrolet", model: "Corsa"};
cars[2] = {brand: "Fiat", model: "Palio"};
  
let ka = cars.find(function (car) {
	return car.model === 'Ka';
});
console.log(ka);