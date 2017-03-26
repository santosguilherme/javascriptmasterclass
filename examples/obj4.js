let book = {
	title: "Clean Code",
	pages: 240
};

Object.freeze(book);

book.author = "Robert Martin";
book.title = "Refactoring";

console.log(book);