var map = new Map();
var weakmap = new WeakMap();

(function(){
    var ny = {state: "NY"};
    var or = {state: "OR"};

    map.set(ny, "Albany");
    weakmap.set(or, "Salem");
})();

console.log(map);
console.log(weakmap);