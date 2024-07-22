import { generateRandomNumber } from "./game.js";
import Field from "./game.js"

const form = document.querySelector('form');
const width = document.getElementById('width');
const height = document.getElementById('height');
const percentage = document.getElementById('percentage');
const errorMessage = document.querySelector('.gamestart span');
const firstScreen = document.querySelector('.gamestart');
const secondScreen = document.querySelector('.gameplay');
const thirdScreen = document.querySelector('.gameover');
const restartBtn = document.getElementById('restart');
const hardModeBtn = document.getElementById('hard-mode');
const mainMenuBtn = document.getElementById('main');
const howToPlayBtn = document.querySelector('.how-to-play');
const howToPlay = document.querySelector('.how-absolute');
const crossHowToPlay = document.querySelector('.cross');
export const validitySpan = document.querySelector('.validity');
export const resultHeading = document.getElementById('result');
export const gameGrid = document.getElementById('game');
export const buttonBlock = document.getElementById('button-block');

let myField = {};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let tempPercentage = Number(percentage.value);
    const tempHeight = Number(height.value);
    const tempWidth = Number(width.value);

    console.log(tempHeight, tempWidth);

    width.value = '';
    height.value = '';
    percentage.value = '';


    if (!tempPercentage) {
        tempPercentage = generateRandomNumber(99) + 1;
    }

    if (tempHeight < 1 || isNaN(tempHeight)) {
        errorMessage.classList.replace('hidden', 'active');
        height.classList.add('error');
        errorMessage.textContent = 'Height is required!';
    } else if (tempHeight > 20) {
        errorMessage.classList.replace('hidden', 'active');
        height.classList.add('error');
        errorMessage.textContent = 'Max value is 20!';
    }

    if (tempWidth < 1 || isNaN(tempWidth)) {
        console.log(isNaN(tempWidth))
        errorMessage.classList.replace('hidden', 'active');
        width.classList.add('error');
        errorMessage.textContent = 'Width is required!';
    } else if (tempWidth > 20) {
        errorMessage.classList.replace('hidden', 'active');
        width.classList.add('error');
        errorMessage.textContent = 'Max value is 20!';
    }

    if (tempHeight > 0
        && tempWidth > 0
        && !isNaN(tempHeight)
        && !isNaN(tempWidth)
        && tempHeight <= 20
        && tempWidth <= 20) {

        firstScreen.classList.replace('active', 'hidden');
        secondScreen.classList.replace('hidden', 'active');

        myField = new Field(Field.generateField(tempHeight, tempWidth, tempPercentage));

        myField.play();
    }

    restartBtn.addEventListener('click', () => {
        myField = new Field(Field.generateField(tempHeight, tempWidth, tempPercentage));
        myField.play();
    });

    hardModeBtn.addEventListener('click', () => {
        myField.hardMode();
    })
});

width.addEventListener('focus', () => {
    if (width.classList.contains('error')) {
        width.classList.remove('error');
        errorMessage.classList.replace('active', 'hidden');
    }
})

height.addEventListener('focus', () => {
    if (height.classList.contains('error')) {
        height.classList.remove('error');
        errorMessage.classList.replace('active', 'hidden');
    }
});


mainMenuBtn.addEventListener('click', () => {
    if (secondScreen.classList.contains('active')) {
        window.location.reload();
    }
});

howToPlayBtn.addEventListener('click', () => {
    howToPlay.classList.replace('hidden', 'active');

    window.addEventListener('click', (e) => {
        if (howToPlay.classList.contains('active')) {
            if ((e.target === crossHowToPlay) || ((e.target !== (howToPlay && howToPlayBtn)))) {
                howToPlay.classList.replace('active', 'hidden');
            }
        }
    })
})

