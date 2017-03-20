import Select from './Select';
import Update from './Update';

let select = new Select();
console.log(select.execute("select name, age from author where age = 45"));

let update = new Update();
update.execute("update author set name = Linus Torvalds, age = 50");

console.log(select.execute("select name, age from author where age = 45"));