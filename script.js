const piano = document.querySelector(`.piano`);
const pianoKeys = document.querySelectorAll(`.piano-key`);
const btnContainer = document.querySelector(`.btn-container`);
const buttons = document.querySelectorAll(`.btn`)

//!--------------Toggle button handler-----------------------------------//

btnContainer.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`btn-active`)) {
        return;
    }
    buttons.forEach(btn => btn.classList.toggle(`btn-active`));
    pianoKeys.forEach(pianoKey => pianoKey.classList.toggle(`piano-key-letter`));
})

//!-----------------Fullscreen mode------------------------------------//

document.querySelector(`.fullscreen`).addEventListener(`click`, () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})
