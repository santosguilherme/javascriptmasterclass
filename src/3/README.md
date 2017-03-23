### Exercício 3

#### Objetivo
Agora vamos começar a organizar as coisas. Na primeira parte do exercício, vamos incorporar no objeto "database", dois métodos: "createTable" e "execute". O método "createTable" já foi implementado no exercício anterior, basta mover os conceitos e utilizar o this para referenciar o objeto "tables". Tome muito cuidado com esta etapa, não tente mover e alterar o comportamento do código ao mesmo tempo, foque apenas em mover o código e fazer funcionar, invocando o método "createTable" diretamente.

Na parte 2, vamos implementar o método "insert". Para isso, é necessário como sempre extrair as informações a partir do comando, converter as informações em um objeto e inserir no array "data", da tabela correspondente.

#### Tempo
30 minutos

#### Instruções

Parte 1

1. No objeto "database", crie uma função chamada "createTable", que recebe o comando por parâmetro.

Parte 2

Dados os comandos: 

```sql
insert into author (name, age) values (Douglas Crockford, 62)
insert into author (name, age) values (Linus Torvalds, 47)
insert into author (name, age) values (Martin Fowler, 54)
```

1. No objeto "database", crie uma função chamada "insert", que recebe o comando por parâmetro
2. Dentro da função "insert":
  a. Extraia o nome da tabela, as colunas e os valores
  b. Monte o objeto que deve ser inserido
  c. Insira o objeto
3. Agora temos dois comandos: "createTable" e "insert". Crie uma função chamada "execute", responsável por chamar o método "createTable" ou "insert", dependendo do comando

#### Cenário

```javascript
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (1, Linus Torvalds, 47)");
```

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
        "id": "1",
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
* this
* method