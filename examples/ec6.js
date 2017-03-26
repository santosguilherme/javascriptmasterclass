var x = 10;
 
function foo() {
  console.log(x);
}

(function (bar) {
  var x = 20; 
  bar();
 
})(foo);