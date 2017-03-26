var cars = [];
 
cars[0] = {selected: true, brand: "Ford", model: "Ka"};
cars[1] = {selected: true, brand: "Chevrolet", model: "Corsa"};
cars[2] = {selected: true, brand: "Fiat", model: "Palio"};

let isSelected = cars.every(function (car) {
	return car.selected;
});

console.log(isSelected);