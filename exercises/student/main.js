const database = {
  tables: {},
  execute(command){
    if (command.startsWith('create table')) {
      return this.createTable(command);
    }

    if (command.startsWith('insert into')) {
      return this.insert(command);
    }
  },
  createTable(createCommand){
    const regex = /^create table ([a-z]+) \(([a-z\s,]+)\)$/;
    let [, tableName, columns] = createCommand.match(regex);
    columns = columns.split(/,\s?/);

    this.tables[tableName] = {
      columns: Object.assign({}, ...columns.map(column => {
        const [key, value] = column.split(/\s/);

        return {[key]: value};
      })),
      data: []
    };
  },
  insert(insertCommand){
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
};

Object.defineProperty(database, 'tables', {
  writable: false,
  configurable: false,
  enumerable: true
});

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");

console.log(JSON.stringify(database));
//console.log(JSON.stringify(database, null, 2));
