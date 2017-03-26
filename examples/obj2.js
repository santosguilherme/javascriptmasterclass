let title = "Refactoring";
let author = "Martin Fowler";
let pg = 342;

let book = {title, author, pages: pg};

for(let key in book) {
	console.log(`${key} ${book[key]}`);
}

for(let key of Object.keys(book)) {
	console.log(key);
}

console.log(Object.values(book));

console.log('title' in book);






