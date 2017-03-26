const Database = function () {
  let tables = {};

  this.execute = function (command) {
    if (command.startsWith('create table')) {
      return createTable(command);
    }

    if (command.startsWith('insert into')) {
      return insert(command);
    }

    if (command.startsWith('select')) {
      return select(command);
    }
  };

  const createTable = function (createCommand) {
    const regex = /^create table ([a-z]+) \(([a-z\s,]+)\)$/;
    let [, tableName, columns] = createCommand.match(regex);
    columns = columns.split(/,\s?/);

    tables[tableName] = {
      columns: Object.assign({}, ...columns.map(column => {
        const [key, value] = column.split(/\s/);

        return {[key]: value};
      })),
      data: []
    };
  };

  const insert = function (insertCommand) {
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

    tables[tableName].data.push(insertObject);
  };

  const select = function (selectCommand) {
    const regex = /^select ([a-z\s,]+) from ([a-z]+)$/;
    let [, columns, tableName] = selectCommand.match(regex);
    columns = columns.split(/,\s?/);

    if (!(tableName in tables)) {
      throw `Não existe tabela criada com o nome ${tableName}`;
    }

    return tables[tableName].data.map(row => {
      let returnObj = {};

      for (let column of columns) {
        Object.assign(returnObj, {[column]: row[column]});
      }

      return returnObj;
    });
  };
};

const database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
console.log(JSON.stringify(database.execute("select id, name, age from author")));
