function finneyToWei(amount) {
  return amount * Math.pow(10, 15)
}


function etherToWei(amount) {
  return amount * Math.pow(10, 18)
}

function weiToEther(amount) {
  return amount / Math.pow(10, 18)
}

function getDisplayPrice(amount) {
  return parseFloat(amount).toFixed(3);
}

export {
  finneyToWei,
  etherToWei,
  weiToEther,
  getDisplayPrice
};