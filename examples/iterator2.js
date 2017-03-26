let iterable = {
	[Symbol.iterator]() {
		return {
			i: 0,
			numbers: [1,2,3,4,5,6,7,8,9],
			next: function () {
				return (this.i < this.numbers.length) ? {value: this.numbers[this.i++], done: false} : {done: true};
			}
		}
	}
};

for(let number of iterable) {
	console.log(number);
}