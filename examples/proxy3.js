let book = new Proxy({
  title: "Domain-Drive Design",
  author: "Eric Evans",
  pages: 450,
  getTitle() {
  	return this.title;
  }
}, {
  get(target, propertyName) {
  	return Reflect.get(target, propertyName);
  },
  set(target, propertyName, value) {
  	Reflect.set(target, propertyName, value);
  }
});

book.title = "Clean Code";
console.log(book.getTitle());