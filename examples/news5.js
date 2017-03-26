var Woman = function (name) {
	this.name = name;
};

Woman.prototype.gender = "fem" + Math.random();

function _new(fn, ...params) {
	let obj = Object.create(fn.prototype);
	fn.apply(obj, params);
	return obj;
}

function _instanceof(obj, fn) {
	if (obj === null) return false;
	if (obj === fn.prototype) return true;
	return _instanceof(obj.__proto__, fn);
}

let ana = _new(Woman, "Ana");
let maria = _new(Woman, "Maria");

var hoje = new Date();

console.log(_instanceof(ana, Woman));
console.log(_instanceof(hoje, Date));