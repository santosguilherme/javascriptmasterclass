function calculatePrime(amount) {

	let isPrime = function(number) {
	    if(number < 2) return false;
	    for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
	        if(number % i === 0) return false;
	    }
	    return true;
	};

	let start = (new Date()).getTime();
	let number = 0;
	let numberOfPrimes = 0;
	while(true) {
	    if(isPrime(++number)) numberOfPrimes++;
	    if(numberOfPrimes === amount) break;
	}
	let end = (new Date()).getTime();
	console.log((end - start) + "ms");
	return number;
}

let result = calculatePrime(100000);
console.log(result);