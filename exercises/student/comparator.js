export default class Comparator {
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
