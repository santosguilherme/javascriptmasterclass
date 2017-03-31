var numberGenerator = function* () {
	let counter = 0;
	while(true) {
		yield counter++;
	}
};

var generator = numberGenerator();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());