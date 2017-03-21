### Exercício 4

#### Tempo
20 minutos

#### Instruções

Parte 1

Dada o comando: _select name, age from author_

1. Crie uma função chamada "select".
2. Na função "select", retorne todos os registros considerando apenas as colunas selecionadas.
3. Na função "execute", inclua o comando "select"

Parte 2

1. Faça o tratamento de erros, lançando um erro caso a tabela ou a coluna não exista.

#### Resultado

```javascript
[{
	"name": "Douglas Crockford",
	"age": "62"
}, {
	"name": "Linus Torvalds",
	"age": "47"
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