let ProgrammingBook = function (title, author) {
	this.title = title;
	this.author = author;
};

ProgrammingBook.prototype.category = "Programming";

let refactoring = new ProgrammingBook("Refactoring", "Martin Fowler");

console.log(refactoring.category);