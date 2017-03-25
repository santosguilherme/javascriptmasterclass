let book = {
  title: "Harry Potter"
};
console.log(book == book);
console.log(book === book);
console.log(Object.is(book, book));
let movie = {
  title: "Harry Potter"
};
console.log(book == movie);
console.log(book === movie);
console.log(Object.is(book, movie));

console.log(JSON.stringify(book) == JSON.stringify(movie));