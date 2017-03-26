function sum ({a = 10,b,c}) {
	return a + b + c;
}

let result = sum({
	c: 3,
	b: 2
});

console.log(result);