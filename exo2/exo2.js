
const fs = require('fs');

// METHODE asynchrone

fs.readFile('students.txt', 'utf-8', (err,data)=> {
    if(err){
        console.error(err);
        return
    }
    console.log(data);
});

// METHODE synchrone

try {
    const data = fs.readFileSync('students.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }


