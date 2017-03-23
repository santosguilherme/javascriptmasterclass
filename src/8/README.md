### Exercício 8

#### Tempo
15 minutos

#### Instruções

1. Introduza um timeout randomico no retorno do método "execute"
1. Retorne uma promise no método "execute" da classe "Database"
2. Altere as chamadas do método "execute" para utilizar o "then" e o "catch"

#### Cenário

```javascript
database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
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

> No Node.js, utilize a função setTimeout(fn, ms), passando o tempo em milisegundos no segundo parâmetro.

#### Conteúdo abordado neste exercício

* Math.random
* Math.floor
* Promise