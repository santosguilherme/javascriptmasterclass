export default function co(fn) {
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