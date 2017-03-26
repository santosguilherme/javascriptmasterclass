var book = {
	get title() {
		console.log("A propriedade title está sendo consultada...");
		return this._title;
	},
	set title(value) {
		if (!value) throw "Invalid value";
		this._title = value;
	}
};

book.title = "Refactoring";

console.log(book.title);