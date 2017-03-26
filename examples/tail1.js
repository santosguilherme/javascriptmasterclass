"use strict"

let a = function (value) {
  console.trace();
  return b(value);
};
  
let b = function (value) {
  console.trace();
  return c(value);
}
  
let c = function(value) {
  console.trace();
  console.log(value);
}
a("JavaScript");