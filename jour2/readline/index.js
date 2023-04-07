const readline = require('readline');

const students = ['Alan', 'Sonia', 'Sophie'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrez un nom d\'étudiant : ', (answer) => {
  const name = answer.trim().toLowerCase();

  const foundStudent = students.find((student) => {
    return student.toLowerCase().replace(/\s/g, '') === name;
  });

  if (foundStudent) {
    console.log(`L'étudiant ${foundStudent} a été trouvé !`);
  } else {
    console.log(`Aucun étudiant trouvé avec le nom "${name}".`);
  }

  rl.close();
});