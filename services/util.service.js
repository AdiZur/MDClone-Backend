
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function capitalizeWords(string) {
  let regex = /(?:^|\s)\S/g
  return string.replace(regex, function (x) { return x.toUpperCase() });
}
function getRandomGender() {
  return (Math.random() >= 0.5) ? 'female' : 'male';
}

module.exports = {
  getRandomInt,
  capitalizeWords,
  getRandomGender
}
