class Table {
  constructor() {
    this.columns = {};
    this.data = [];
  }
}

class Database {
  constructor(name = 'New Database') {
    this.name = name;
    this.tables = {};
  }

  execute(command) {
    const regex = /^(create|select|insert)/;
    const method = command.match(regex)[0];

    if(!method){
      throw `Operação ${method} não enconstrada`;
    }

    return this[method](command);
  }

  create(createCommand) {
    const regex = /^create table ([a-z]+) \(([a-z\s,]+)\)$/;
    let [, tableName, columns] = createCommand.match(regex);
    columns = columns.split(/,\s?/);

    this.tables[tableName] = new Table();

    Object.assign(this.tables[tableName].columns, ...columns.map(column => {
      const [key, value] = column.split(/\s/);

      return {[key]: value};
    }));
  }

  insert(insertCommand) {
    const regex = /^insert into ([a-z]+) \(([a-z\s,]+)\) values \(([\w\s,]+)\)$/;
    let [, tableName, columns, values] = insertCommand.match(regex);
    columns = columns.split(/,\s?/);
    values = values.split(/,\s?/);

    let insertObject = {};

    for (let index = 0; index < columns.length; index++) {
      Object.assign(insertObject, {
        [columns[index]]: values[index]
      });
    }

    this.tables[tableName].data.push(insertObject);
  }

  select(selectCommand) {
    const regex = /^select ([a-z\s,]+) from ([a-z]+)$/;
    let [, columns, tableName] = selectCommand.match(regex);
    columns = columns.split(/,\s?/);

    if (!(tableName in this.tables)) {
      throw `Não existe tabela criada com o nome ${tableName}`;
    }

    return this.tables[tableName].data.map(row => {
      let returnObj = {};

      for (let column of columns) {
        Object.assign(returnObj, {[column]: row[column]});
      }

      return returnObj;
    });
  };
}

const database = new Database('Javascript Masterclass');
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
console.log(JSON.stringify(database.execute("select id, name, age from author")));

console.log(database.name);
