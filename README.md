# JavaScript Masterclass

Ao longo do treinamento, vamos construir, passo a passo, um **gerenciador de banco de dados**, ou SGBD, com **suporte para a linguagem SQL**.

Os comandos suportados são:

#### CREATE TABLE

> _**Sintaxe:** create table tableName (columnName1 columnType1, ..., columnNameN columnTypeN)_

> _**Exemplo:** create table author (id number, name string, age number, city string, state string, country string)_

#### INSERT

> _**Sintaxe:** insert into tableName (columnName1, ..., columnNameN) values (columnValue1, ..., columnValueN)_

> _**Exemplo:** insert into author (id, name, age) values (1, Douglas Crockford, 62)_

#### SELECT

> _**Sintaxe:** select columnName1, ..., columnNameN from tableName where columnName1 = columnValue1 and ... and columnNameN = columnValueN_

> _**Exemplo:** select name, age, city from author where id = 1_

#### UPDATE

> _**Sintaxe:** update tableName set (columnName1 = columnValue1, ..., columnNameN = columnValueN) where columnName1 = columnValue1 and ... columnNameN = columnValueN_

> _**Exemplo:** update author set age = 45 where id = 2_