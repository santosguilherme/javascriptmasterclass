### Exercício 3

#### Tempo
20 minutos

#### Instruções

Parte 1

1. Crie uma função chamada "createTable", que recebe o statement por parâmetro.
2. Crie uma função chamada "execute", que recebe o statement por parâmetro e invoca a função correspondente ao comando.

Parte 2

Dados os comandos: 

_insert into author (id, name, age) values (1, Douglas Crockford, 62)_
_insert into author (id, name, age) values (2, Linus Torvalds, 47)_

1. Crie uma função chamada "insert", que recebe o statement por parâmetro.
2. Extraia o nome da tabela, as colunas e os valores.
3. Monte o objeto que deve ser inserido.
4. Insira o objeto.
5. Na função "execute", inclua o comando "insert"


#### Resultado

```javascript
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
        "id": "1",
        "name": "Douglas Crockford",
        "age": "62"
      }, {
        "id": "2",
        "name": "Linus Torvalds",
        "age": "47"
      }]
    }
  }
}
```

#### Dicas

> Utilize um for, com índice, para percorrer ao mesmo tempo o array de colunas e de valores. Utilize a operação push para incluir no array "data".

#### Conteúdo abordado neste exercício

* Function
* for
* if
* Array.prototype.push
* String.prototype.startsWith