# JavaScript Masterclass

Ao longo do treinamento, vamos construir, passo a passo, um **gerenciador de banco de dados**, ou SGBD, com **suporte para a linguagem SQL**.

Os comandos suportados são:

#### CREATE TABLE

```sql
create table author (id number, name string, age number, city string, state string, country string)
```

#### INSERT

```sql
insert into author (id, name, age) values (1, Douglas Crockford, 62)
```

#### SELECT

```sql
select name, age, city from author where id = 1
```

#### UPDATE

```sql
update author set age = 45 where id = 2
```