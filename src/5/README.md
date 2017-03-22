### Exercício 5

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
database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
database.execute("select id, name, age from author");
database.execute("update author set name = Martin Fowler, age = 57");
let result = database.execute("select name, age from author");
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