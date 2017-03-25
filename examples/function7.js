let sum = function ([a, b, c = 10]) {
	console.log(a, b, c);
  return a + b + c;
 };

 console.log(sum([1,2]));