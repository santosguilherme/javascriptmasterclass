"use strict";

function fib (n) {
	if (n <= 1) return n;
	console.trace();
	return fib(n - 1) + fib(n - 2);
}
fib(10);