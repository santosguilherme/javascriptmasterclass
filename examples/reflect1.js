let book = {
  title: "Domain-Drive Design",
  author: "Eric Evans",
  pages: 450
};
let bookProxy = new Proxy(book, {
  get(target, propertyName) {
    console.log(`Consultando a propriedade: ${propertyName}`);
    return Reflect.get(target, propertyName);
  },
  set(target, propertyName, value) {
    if (propertyName === 'author') {
      console.log(`Tentando alterar a propriedade: ${propertyName} para ${value}`);
      return;
    }
    return Reflect.set(target, propertyName, value);
  }
});
console.log(bookProxy.title);
bookProxy.author = "Eric Gamma";
console.log(bookProxy.author);