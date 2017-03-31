var cars = [];
 
cars[0] = {selected: false, brand: "Ford", model: "Ka"};
cars[1] = {selected: true, brand: "Chevrolet", model: "Corsa"};
cars[2] = {selected: true, brand: "Fiat", model: "Palio"};

let isSelected = cars.some(function (car) {
	return car.selected;
});

console.log(isSelected);