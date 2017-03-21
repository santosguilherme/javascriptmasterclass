Exercício: 3
Tempo: 15 minutos

Instruções:

Dada a query: "insert into author (id, name, age) values (1, Douglas Crockford, 62)"

1 - Extraia o nome da tabela, as colunas e os valores.
2 - Monte o objeto que deve ser inserido.
3 - Insira o objeto

Resultado:

{
  "tables": {
    "author": {
      "columns": {
        "id": "number",
        "name": "string",
        "age": "number",
        "city": "string",
        "state": "string",
        "country": "string"
      },
      "data": [{
        "name": "Douglas Crockford",
        " age": " 62"
      }]
    }
  }
}

Dicas: 

Explore ao máximo as operações disponíveis na String API como: match, replace e split, juntamente com expressões regulares.

Conteúdo abordado neste exercício: 

* Object
* for
* Array.prototype.push