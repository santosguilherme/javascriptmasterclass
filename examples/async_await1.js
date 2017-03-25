function getResult(result) {
	return new Promise (function (resolve, reject) {
		setTimeout(function () {
			resolve(result);
		}, 1000);
	});
}

async function main() {
	var total = 0;
	total += await getResult(1);
	total += await getResult(2);
	total += await getResult(3);
	console.log(total);
}

main();