let book = {
	title: "Harry Potter",
	pages: 700,
	[Math.random()]: 897987,
	[Symbol('editora')]: "Editora Vozes"
};
book.author = "J. K. Rowling";
let field = "category of book";
book[field] = "Fiction";
console.log(book[Object.getOwnPropertySymbols(book)[0]]);
Object.assign(book, {
	isbn: 987987987, 
	price: 39.90
});
console.log(book);