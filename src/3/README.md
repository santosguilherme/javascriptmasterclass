Exercício: 3
Tempo: 15 minutos

Instruções:

1 - Dentro do objeto "tables" e dentro do objeto "author", crie uma propriedade chamada "data", contendo um array com dois objetos.

Objetos:

id      -> 1
name    -> "Douglas Crockford"
age     -> 62
city    -> "Frostbite Falls"
state   -> "Minesotta"
country -> "United States"

id      -> 2
name    -> "Linus Torvalds"
age     -> 47
city    -> "Helsinki"
state   -> "Uusimaa"
country -> "Finland"

2 - Dada a query: "select id, name, age from author", retorne apenas as colunas selecionadas.

Resultado esperado:

[ { id: 1, name: 'Douglas Crockford', age: 62 },
  { id: 2, name: 'Linus Torvalds', age: 47 } ]

Dicas: 

Percorra as colunas com for/of e utilize a notação de [] tanto para definir as propriedades em um objeto de retorno quanto para buscar os valores armazenados na tabela. Lembra-se que você pode utilizar Object.assign(obj, {key: value}) para definir novas propriedades em um objeto.

Conteúdo abordado neste exercício:

* Object
* Object.assign
* for/of
* Array.prototype.push

