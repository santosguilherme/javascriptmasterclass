let ProgrammingBook = function (title, author) {
	this.title = title;
	this.author = author;
};

ProgrammingBook.prototype.category = "Programming";

let _new = function (fn, ...parameters) {
	let obj = {};
	obj.__proto__ = fn.prototype;
	fn.apply(obj, parameters);
	return obj;
};

let refactoring = _new(ProgrammingBook, "Refactoring", "Martin Fowler");

console.log(refactoring.category);