function getResult(value) {
	return new Promise (function (resolve, reject) {
		if (!value) reject("Invalid value");
		setTimeout(function () {
			resolve(value);
		}, 1000);
	});
}

function co(fn) {
	iterateOver(fn());
}

function iterateOver(gen, result) {
	var next = gen.next(result);
	if (!next.value) return;
	next.value.then(function (result) {
		iterateOver(gen, result);
		if (next.done) return;
	}).catch(function (e) {
		gen.throw(e);
	});
}

function main() {
	co(function* () {
		try {
			var total = 0;
			total += yield getResult(1);
			total += yield getResult(2);
			total += yield getResult(3);
			console.log(total);
		} catch (e) {
			console.log(e);
		}
	});
}

main();