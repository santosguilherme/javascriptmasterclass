const SQL_COMMAND = 'create table author (id number, name string, city string, state string, country string)',
      extractedCommand = SQL_COMMAND.match(/^create table ([a-z]+) \(([a-z\s,]+)\)$/),
      tableName = extractedCommand[1],
      columns = extractedCommand[2].split(/,\s?/),
      database = {
        tables: {
          [tableName]: {
            columns: {},
            data: []
          }
        }
      };

Object.assign(database.tables[tableName].columns,
  ...columns.map(column => {
    const columnExtracted = column.split(/\s/);

    return {[columnExtracted[0]]: columnExtracted[1]};
  }));

Object.defineProperty(database, 'tables', {
  writable: false,
  configurable: false,
  enumerable: true
});

delete database.tables;
console.log(JSON.stringify(database));

