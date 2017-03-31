let delayedSum = function (a,b) {
	return new Promise(function (resolve, reject) {
		if (!a || !b) return reject("Invalid input");
		setTimeout(function () {
		  resolve(a + b);
		}, 1000);
	});
};

delayedSum(2).then(function (result) {
	console.log(result);
}).catch(function (e) {
	console.log(e);
});