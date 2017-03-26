function foo() {
  var x = 10;
  return function bar() {
    console.log(x);
  };
}
 
var returnedFunction = foo();
 
var x = 20;
 
returnedFunction();