let sentence = "Meu nome é Pedro";
let exp = /Meu nome é ([a-zA-Z]+)/;
let nome = sentence.match(exp)[1];
console.log(nome);