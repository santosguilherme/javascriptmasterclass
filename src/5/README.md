### Exercício 5

#### Objetivo
Finalmente, chegou a hora de migrar o código da função construtora para a classe. Na segunda parte, implemente o método "update".

#### Tempo
15 minutos

#### Instruções

Parte 1

1. Converta a implementação da função construtora em uma class

Parte 2

Dada o comando: 

```sql
update author set name = Martin Fowler, age = 57
```

1. Crie um novo método chamado "update".
2. Vincule o método "update" no método "execute".

#### Cenário

```javascript
let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("update author set name = Martin Fowler, age = 57");
database.execute("select id, name, age from author");
```

#### Resultado

```javascript
[{
	"id": 1,
	"name": "Martin Fowler",
	"age": "57"
}, {
	"id": 2,
	"name": "Martin Fowler",
	"age": "57"
}]
```

Dicas:

### Conteúdo abordado neste exercício

* class
* constructor
* method