### Exercício 3

#### Tempo
20 minutos

#### Instruções

Parte 1

1. No objeto "database", crie uma função chamada "createTable", que recebe o statement por parâmetro.
2. No objeto "database", crie uma função chamada "execute", que recebe o statement por parâmetro e invoca a função correspondente ao comando.

Parte 2

Dados os comandos: 

```sql
insert into author (name, age) values (Douglas Crockford, 62)
insert into author (name, age) values (Linus Torvalds, 47)
insert into author (name, age) values (Martin Fowler, 54)
```

1. No objeto "database", crie uma função chamada "insert", que recebe o statement por parâmetro.
2. Dentro da função "insert":
  a. Extraia o nome da tabela, as colunas e os valores.
  b. Monte o objeto que deve ser inserido.
  c. Insira o objeto.
3. Na função "execute", inclua o comando "insert"
4. Se a coluna tiver a opção "autoincrement", crie uma propriedade chamada "sequence" para armazenar o contador.


#### Resultado

```javascript
{
  "tables": {
    "author": {
      "columns": {
        "id": {
          "type": "number",
          "options": ["autoincrement"],
          "sequence": 3
        },
        "name": {
          "type": "string",
          "options": []
        },
        "age": {
          "type": "number",
          "options": []
        },
        "city": {
          "type": "string",
          "options": []
        },
        "state": {
          "type": "string",
          "options": []
        },
        "country": {
          "type": "string",
          "options": []
        }
      },
      "data": [{
        "name": "Douglas Crockford",
        "age": "62",
        "id": 1
      }, {
        "name": "Linus Torvalds",
        "age": "47",
        "id": 2
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
* switch
* Array.prototype.push
* String.prototype.startsWith
* this
* method
* Inicialização com ||