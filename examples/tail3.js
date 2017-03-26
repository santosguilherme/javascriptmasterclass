"use strict"

function fib (n) {
	return fibI(n, 1, 0);
}

function fibI (n, a, b) {
	if (n === 0) return b;
	console.trace();
	return fibI(n - 1, a + b, a);
}

fib(10);