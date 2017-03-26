let capitals = new Map();
capitals.set("Santa Catarina", "Florianópolis");
capitals.set("Acre", "Rio Branco");
capitals.set("Paraná", "Curitiba");

capitals.forEach(function (v, k) {
	console.log(`${v} é a capital de ${k}`);
});

console.log(capitals.get("Santa Catarina"));
console.log(capitals.has("Acre"));
console.log(capitals.size);
console.log(Array.from(capitals));