### Exercício 7

#### Tempo
15 minutos

#### Instruções

Dado o comando:

```sql
select name, age from author where id = 1
```

1. Considere a cláusula where na expressão regular que extrai os dados do comando
2. Converta os valores em um objeto onde a chave é a coluna e o valor é o valor
3. Antes de selecionar as colunas, filtre os dados, mantendo somente aquele que atendem a cláusula where
4. Implemente o order by

#### Cenário

```javascript
database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
database.execute("insert into author (name, age) values (Martin Fowler, 54)");
let result = database.execute("select id, name, age from author where id = 1");
```

#### Resultado

```javascript
[{
	"id": 1,
	"name": "Douglas Crockford",
	"age": "62"
}]
```

#### Dicas

Você pode utilizar a operação Array.prototype.map para converter um array em outro e ainda utilizaar a operação Array.prototype.filter para filtrar os dados.

#### Conteúdo abordado neste exercício

* Array
* Array.prototype.filter
* Array.prototype.map
* Array.prototype.forEach
* String.prototype.localeCompare