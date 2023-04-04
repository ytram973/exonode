function calcPriceTTC(priceHT) {
    const taxRate = 0.2; // Taux de TVA de 20%
    const priceTTC = priceHT * (1 + taxRate); 
    return priceTTC.toFixed(2); 
}

  module.exports = {
    calcPriceTTC,
  };