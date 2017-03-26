import Comparator from './comparator';

export default class Table {
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
