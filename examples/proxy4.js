function calculatePrime(amount) {

	let isPrime = function(number) {
	    if(number < 2) return false;
	    for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
	        if(number % i === 0) return false;
	    }
	    return true;
	};

	
	let number = 0;
	let numberOfPrimes = 0;
	while(true) {
	    if(isPrime(++number)) numberOfPrimes++;
	    if(numberOfPrimes === amount) break;
	}
	return number;
}

let calculatePrimeProxy = new Proxy(calculatePrime, {
	apply(fn, thisValue, args) {
		let start = (new Date()).getTime();
		let result = Reflect.apply(fn, thisValue, args);
		let end = (new Date()).getTime();
		let time = `${end - start} ms`;
		return {result, time};
	}
});

let result = calculatePrimeProxy(100000);
console.log(result);