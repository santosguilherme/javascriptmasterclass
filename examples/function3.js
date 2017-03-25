let sum = function (a, b) {
  return a + b;
};
let subtract = function (a, b) {
  return a - b;
};
let calculator = function (fn) {
  return function (a, b) {
    return fn(a, b)
  }
};

console.log(calculator(subtract)(2,2));