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
select name, age, city from author where age > 50 and age < 60
```

#### UPDATE

```sql
update author set age = 45 where id = 2
```

### Configuração

Recomendo a utilização do babel para auxiliar na compilação do código, indicando qualquer erro de sintaxe que possa surgir e também para converter o código escrito em ECMA6 para ECMA5.1, em casos de funcionalidades que ainda não são suportadas pelo Node.js, como Modules. 

```sh
npm install -g babel
```

```sh
npm install
```

```sh
npm run-script babel
```