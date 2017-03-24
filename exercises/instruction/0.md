# JavaScript Masterclass

Ao longo do treinamento, vamos construir, passo a passo, um **gerenciador de banco de dados**, ou SGBD, com **suporte para a linguagem SQL**.

Os exercícios estão divididos em de 1 a 8, conforme o conteúdo for avançando, vamos fazendo um a um.

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
select name, age, city from author where age > 50 and age < 60
```

#### UPDATE

```sql
update author set age = 45 where id = 2
```

#### DELETE

```sql
delete from author where age < 50
```