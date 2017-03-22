### Exercício 1

#### Tempo
15 minutos

#### Instruções:

Dada o comando: 

```sql
_create table author (id number, name string, city string, state string, country string)_
```

1. Extraia o nome da tabela e armazene na variável "tableName"
2. Extraia as colunas da tabela e armazene na variável "columns"

#### Resultado

```javascript
tableName = "author"
columns = [ 'id number',' name string',' age number',' city string',' state string',' country string']
```

#### Dicas

> Explore ao máximo as operações disponíveis na String API como: match, replace e split, juntamente com expressões regulares.

#### Conteúdo abordado neste exercício

* String
* String.prototype.replace 
* String.prototype.match 
* String.prototype.split
* String.prototype.trim
* RegExp