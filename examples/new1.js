var programmingBook = {
	category: "Programming"
};

var createProgrammingBook = function (title, author) {
	var book = Object.create(programmingBook);
	Object.assign(book, {title, author});
	return book;
}

var refactoring = createProgrammingBook("Refactoring", "Martin Fowler");

var cleanCode = createProgrammingBook("Clean Code", "Robert Martin");

console.log(refactoring, cleanCode);