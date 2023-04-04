const { calcPriceTTC } = require("./utils");


const priceHT = [
    { name: "Apple", priceHT: 1.0, priceTTC: null },
    { name: "Orange", priceHT: 1.2, priceTTC: null },
    { name: "Rasberry", priceHT: 2.5, priceTTC: null },
  ];
  
  
  for (let i = 0; i < priceHT.length; i++) {
    const fruit = priceHT[i];
    fruit.priceTTC = calcPriceTTC(fruit.priceHT);
  }
  
  
  console.log(priceHT);