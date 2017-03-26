var refactoring = {
	title: "Refactoring",
	author: "Martin Fowler",
	pages: 342,
	getTitle: function (publisher) {
		return this.title + publisher;
	}
};

var cleanCode = {
	title: "Clean Code",
	author: "Robert Martin",
	pages: 240,
	getAuthor() {
		return this.author;
	}
};

console.log(refactoring.getTitle.apply(cleanCode, ["PacktPub"]));
console.log(cleanCode.getAuthor());









