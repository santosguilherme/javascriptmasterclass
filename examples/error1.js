var IllegalArgumentError = function (message) {
  this.name = "IllegalArgumentError";
  this.message = message;
};
  
function sum(a, b) {
  if (!a || !b) throw new IllegalArgumentError("Invalid input");
  return a + b;
}
  
try {
  sum(2);
} catch (e) {
  console.log(e.message);
}