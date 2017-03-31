class Test {
	constructor(name = "Test") {
		this.name = name;
	}
}

console.log(new Test(undefined));
console.log(new Test(null));
console.log(new Test(false));
console.log(new Test(0));
console.log(new Test(NaN));
console.log(new Test(''));
console.log(new Test({}));