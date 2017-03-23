### Exercício 7

#### Tempo
30 minutos

#### Instruções

Dado o comando:

```sql
select id, name, age from author where id = 3 and age > 50 and age < 60
```

1. Inclua o tratamento necessário para extrair as cláusulas do comando
2. Crie um objeto contendo "column", "operator" e "value" para cada uma das cláusulas
3. Armazene os objetos em um array

Exemplo:

```javascript
[
	{"column": "id", "operator": "=", "value": "3"},
	{"column": "age", "operator": ">", "value": "50"},
	{"column": "age", "operator": "<", "value": "60"}
]
```

4. Antes de selecionar as colunas, filtre os dados, mantendo somente os registros que atendem as cláusulas

#### Cenário

```javascript
database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
database.execute("insert into author (name, age) values (Martin Fowler, 54)");
let result1 = database.execute("select id, name, age from author where id = 1");
let result2 = database.execute("select id, name, age from author where id = 1");
let result3 = database.execute("select id, name, age from author where id < 60");
let result4 = database.execute("select id, name, age from author where age > 50 and age < 60");
```

#### Resultado


```javascript
[{
	"id": 1,
	"name": "Douglas Crockford",
	"age": "62"
}, {
	"id": 2,
	"name": "Linus Torvalds",
	"age": "47"
}, {
	"id": 3,
	"name": "Martin Fowler",
	"age": "54"
}]
```

```javascript
[{
	"id": 1,
	"name": "Douglas Crockford",
	"age": "62"
}]
```

```javascript
[{
	"id": 2,
	"name": "Linus Torvalds",
	"age": "47"
}, {
	"id": 3,
	"name": "Martin Fowler",
	"age": "54"
}]
```

```javascript
[{
	"id": 3,
	"name": "Martin Fowler",
	"age": "54"
}]
```

#### Dicas

Você pode utilizar a operação Array.prototype.map para converter um array em outro e ainda a operação Array.prototype.filter para filtrar os dados.

#### Conteúdo abordado neste exercício

* Array
* Array.prototype.filter
* Array.prototype.map
* Array.prototype.forEach