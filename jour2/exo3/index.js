const students = [
    { name: 'ALAN', note: 11, address: 'Paris', mention: null },
    { name: 'ALICE', note: 17, address: 'Paris', mention: null },
    { name: 'SOHPHIE', note: 20, address: 'Paris', mention: null },
    { name: 'SONIA', note: 17, address: 'Toulon', mention: null },
    { name: 'ANTOINE', note: 18, address: 'Aubenas', mention: null },
    { name: 'BERNARD', note: 19, address: 'Paris', mention: null },
    { name: 'ALAN', note: 14, address: 'Aubenas', mention: null },
    { name: 'SONIA', note: 18, address: 'Paris', mention: null },
    { name: 'CLARISSE', note: 17, address: 'Marseille', mention: null }
  ];
  
  const ASSEZ_BIEN_THRESHOLD = 12;
  const BIEN_THRESHOLD = 14;
  const TRES_BIEN_THRESHOLD = 16;
  
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = student.note;
    if (average >= TRES_BIEN_THRESHOLD) {
      student.mention = "Très bien";
    } else if (average >= BIEN_THRESHOLD) {
      student.mention = "Bien";
    } else if (average >= ASSEZ_BIEN_THRESHOLD) {
      student.mention = "Assez bien";
    } else {
      student.mention = "Passable";
    }
    console.log(`${student.name} a obtenu la mention ${student.mention}.`);
  }