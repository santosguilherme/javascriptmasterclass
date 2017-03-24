### Exercício 1

#### Objetivo
Vamos começar pela parte mais temida por alguns, as expressões regulares. Basicamente, o objetivo é extrair partes do comando como o nome da tabela e as colunas, armazenando-as em variáveis que serão utilizadas nos próximos exercícios.

#### Tempo
15 minutos

#### Instruções:

Dada o comando: 

```sql
create table author (id number, name string, city string, state string, country string)
```

1. Extraia o nome da tabela e armazene em uma variável chamada "tableName"
2. Extraia as colunas da tabela e armazene em uma variável chamada "columns"
3. Manipule a variável "columns", removendo os parênteses e separando cada coluna, com seu respectivo tipo, em uma string separada.

#### Resultado

```javascript
tableName = "author"
columns = [ 'id number',' name string',' age number',' city string',' state string',' country string']
```

#### Dicas

> Explore ao máximo as operações disponíveis na String API como: String.prototype.match, String.prototype.replace e String.prototype.split, juntamente com expressões regulares. A operação String.prototype.split retorna uma array, então não é necessário se preocupar em criar ou adicionar as colunas no array.

#### Conteúdo abordado neste exercício

* String
* String.prototype.replace 
* String.prototype.match 
* String.prototype.split
* String.prototype.trim
* RegExp
* RegExp - Groups
* RegExp - Capture Groups
* RegExp - Quantifiers
* RegExp - Metacharacters
* RegExp - Escape