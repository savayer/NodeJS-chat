const getRandomArbitrary = (min = 1000000, max = 9999999) => {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = getRandomArbitrary;