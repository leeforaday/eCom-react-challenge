const minimumSaturation = 37;
const maximumLevel = 75;

const getDiff = (colorValue: number, gameLevel: number): number => {
    return ((colorValue / (gameLevel + 2)) + (colorValue / (gameLevel + 3)));
}

const getNumberSquares = (level: number): number => {
    return Math.pow(level + 2, 2);
}

const getRandomSquare = (squares: number): number => {
    return Math.floor(Math.random() * Math.floor(squares));
}

const getRandomHue = (): number => {
    return Math.floor(Math.random() * Math.floor(360));
}

const getRandomLevel = (currentColorLevel: number, currentGameLevel: number): number => {
    return Math.min(maximumLevel, (currentColorLevel + getDiff(currentColorLevel, currentGameLevel)));
}

const getRandomSaturation = (currentColorSaturation: number, currentGameLevel: number): number => {
    return Math.max(minimumSaturation, (currentColorSaturation - getDiff(currentColorSaturation, currentGameLevel)));
}

export {
    getRandomSquare,
    getRandomHue,
    getNumberSquares,
    getRandomLevel,
    getRandomSaturation
};