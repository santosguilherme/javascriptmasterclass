function instanceOf(object, constructor) {
   if (object === null) return false;
   if (object === constructor.prototype) return true;
   return instanceOf(object.__proto__, constructor);
}

var date = new Date();
console.log(instanceOf(date, Date));

var array = new Array();
console.log(instanceOf(array, Date));

var regexp = new RegExp();
console.log(instanceOf(regexp, RegExp));

var string = new String();
console.log(instanceOf(string, String));