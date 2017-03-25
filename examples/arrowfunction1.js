var person = {
	name: "Ana Maria",
	getName() {
		var numbers = [1,2,3];
		numbers.forEach((number) => {
			console.log(this.name);
		});
	}
};

console.log(person.getName());