var persons = [];
 
persons[1] = {name: "Ana", weight: 70};
persons[2] = {name: "Álvaro", weight: 85};
persons[3] = {name: "Bruna", weight: 80};
  
persons.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

console.log(persons);