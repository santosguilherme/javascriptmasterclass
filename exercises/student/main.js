class Comparator {
  static compare(primaryValue, operator, secondValue) {
    if (operator === '=') {
      return primaryValue === secondValue;
    }

    if (operator === '<') {
      return primaryValue < secondValue;
    }

    if (operator === '>') {
      return primaryValue > secondValue;
    }

    return false;
  }
}
class Table {
  constructor() {
    this.columns = {};
    this.data = [];
  }

  getData(conditions = []) {
    return this.data.filter(row => {
      const resultConditions = conditions.map(condition => {
        return Comparator.compare(row[condition.column], condition.operator, condition.value)
      });

      return resultConditions.every(result => result);
    });
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

    if (!method) {
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
    const regex = /^select ([a-z\s,]+) from ([a-z]+)(?: where (.*))?$/;
    let [, columns, tableName, clauses] = selectCommand.match(regex);
    columns = columns.split(/,\s?/);

    if (!(tableName in this.tables)) {
      throw `Não existe tabela criada com o nome ${tableName}`;
    }

    if (clauses) {
      clauses = clauses.split(' and ').map(condition => {
        const [column, operator, value] = condition.split(/\s(=|>|<)\s/);
        return {column, operator, value};
      });
    }

    return this.tables[tableName].getData(clauses).map(row => {
      let returnObj = {};

      for (let column of columns) {
        Object.assign(returnObj, {[column]: row[column]});
      }

      return returnObj;
    });
  };
}

let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
console.log(JSON.stringify(database.execute("select id, name, age from author")));
console.log(JSON.stringify(database.execute("select id, name, age from author where id = 1")));
console.log(JSON.stringify(database.execute("select id, name, age from author where age < 60")));
console.log(JSON.stringify(database.execute("select id, name, age from author where name = Linus Torvalds")));
console.log(JSON.stringify(database.execute("select id, name, age from author where id = 3 and age > 50 and age < 60")));
