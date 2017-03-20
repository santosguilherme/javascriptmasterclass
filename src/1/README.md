Exercício: 1
Tempo: 15 minutos

Instruções:

Dada a query: "select name, age from author"

1 - Extraia as colunas
2 - Extraia o nome da tabela

Resultado esperado:

Devem ser criadas 3 variáveis com os valores abaixo:

columns   -> "name,age"
table     -> "author"

Testes:

console.log((columns === "name,age") ? "OK" : "FAIL");
console.log((table === "author") ? "OK" : "FAIL");

Dicas: 

Explore ao máximo as operações disponíveis na String API como: match, replace e split, juntamente com expressões regulares.

Conteúdo abordado neste exercício: 

* String
* String.prototype.replace 
* String.prototype.match 
* String.prototype.split
* String.prototype.trim
* RegExp