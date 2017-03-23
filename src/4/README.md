### Exercício 4

#### Objetivo
Neste exercício, vamos implementar o método "select" na primeira parte. Depois, já na segunda parte, vamos introduzir o tratamento de erros, lançando um erro caso a tabela não exista. Por fim, vamos migrar de objeto para função construtora. Lembre-se de mudar a forma como o this é utilizado.

#### Tempo
30 minutos

#### Instruções

Parte 1

Dada o comando:

```sql
select name, age from author
```

1. Crie um método chamado "select"
2. No método "select", retorne todos os registros considerando apenas as colunas selecionadas
3. Dentro do método "execute", inclua a chamada para o método "select"

Parte 2

1. Faça o tratamento de erros, lançando um erro caso a tabela ou a coluna não exista

Parte 3

1. Mude de objeto para função construtora

#### Cenário

```javascript
let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("select id, name, age from author");
```

#### Resultado

```javascript
[{
	"id": "1",
	"name": "Douglas Crockford",
	"age": "62"
}, {
	"id": "2",
	"name": "Linus Torvalds",
	"age": "47"
}, {
	"id": "3",
	"name": "Martin Fowler",
	"age": "54"
}]
```

#### Dicas

> Percorra as colunas com for/of e utilize a notação de [] tanto para definir as propriedades em um objeto de retorno quanto para buscar os valores armazenados na tabela. Lembra-se que você pode utilizar Object.assign(obj, {key: value}) para definir novas propriedades em um objeto.

#### Conteúdo abordado neste exercício

* Object
* Object.assign
* in
* for/of
* Array.prototype.push
* throw
* Constructor Function

Private com defineProperty