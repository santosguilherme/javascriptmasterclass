function iter(a) {
	let i = 0;
	return {
		next: function () {
			return (i < a.length) ? { value: a[i++], done: false} : {done: true};
		}
	}
}

let a = [1,2,3];

let x = iter(a);
console.log(x.next().value);
console.log(x.next().value);
console.log(x.next().value);
console.log(x.next().done);