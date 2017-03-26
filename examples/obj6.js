let book = {
	title: "Design Patterns"
};

let otherBook = JSON.parse(JSON.stringify(book));
console.log(otherBook);