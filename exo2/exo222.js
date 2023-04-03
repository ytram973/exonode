const fs = require('fs');

fs.readFile('students.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // séparer les lignes du fichier texte en un tableau
  const lines = data.split('\n');

  // initialiser un tableau pour stocker les informations des étudiants
  const students = [];

  // parcourir chaque ligne et ajouter les informations de l'étudiant correspondant dans le tableau
  lines.forEach((line) => {
    const [notes, name, address] = line.trim().split(' ');
    const student = {
      notes: notes.split(',').map(Number),
      name: name,
      address: address,
    };
    students.push(student);
  });

  // filtrer les étudiants ayant une moyenne strictement supérieure à 17
  const topStudents = students.filter((student) => {
    const average = student.notes.reduce((total, note) => total + note) / student.notes.length;
    return average > 17;
  });

  //trouver l'étudiant qui a obtenu la meilleure note
  let bestStudent = null;
  let bestNote = 0;
  students.forEach((student) => {
    const maxNote = Math.max(...student.notes);
    if (maxNote > bestNote) {
      bestNote = maxNote;
      bestStudent = student;
    }
  });

// Ordonnez maintenant l'ensemble des données dans le tableau.
  students.sort((a, b) => {
    const avgA = a.notes.reduce((acc, curr) => acc + curr, 0) / a.notes.length;
    const avgB = b.notes.reduce((acc, curr) => acc + curr, 0) / b.notes.length;
    return avgB - avgA;
  })


  console.log(bestStudent); //afficher le meilleur étudiant

  console.log(topStudents); // afficher le tableau des meilleurs étudiants
  
  console.log(students)  // afficher le tableau
});
