var person = {
	age: 20,
	printAge: function () {
		(() => {
			console.log(this.age);
		})();
	}
};

person.printAge();