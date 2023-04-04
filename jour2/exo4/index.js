const fs = require("fs");
const readline = require("readline");
const students = JSON.parse(fs.readFileSync("./data/students.json")).students;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt(
  "Entrez le nom de l'étudiant à rechercher (ou 'q' pour quitter)> "
);
rl.prompt();

rl.on("line", (input) => {
  // Si l'utilisateur veut quitter
  if (input.toLowerCase() === "q") {
    rl.close(); // On ferme l'interface readline
  } else {
    const name = input.trim().toLowerCase(); // On met le nom en minuscules et on enlève les espaces au début et à la fin

    const student = students.find((s) => s.name.toLowerCase() === name); // On cherche l'étudiant correspondant (insensible à la casse)
    if (student) {
      const average =
        student.notes.reduce((a, b) => a + b) / student.notes.length; // On calcule la moyenne
      console.log(`Moyenne de ${student.name} : ${average.toFixed(2)}`); // On affiche le résultat avec deux décimales
    } else {
      console.log(`Aucun étudiant trouvé avec le nom '${input}'.`);
    }

    rl.prompt();
  }
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0); // Arrêt du processus
});