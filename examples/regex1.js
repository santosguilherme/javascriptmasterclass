let statement = "select id, age, name from authors";
let exp = /select ([a-z\s,]+) from ([a-z]+)(?: where (.*))?/;