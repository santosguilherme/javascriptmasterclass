function generateSerial(max = 1000) {
	max = max || 1000;
	return Math.floor(Math.random() * max);
}

console.log(generateSerial());