const piano = document.querySelector(`.piano`);
const pianoKeys = document.querySelectorAll(`.piano-key`);
const btnContainer = document.querySelector(`.btn-container`);
const buttons = document.querySelectorAll(`.btn`)
const SOUNDS = {
    KeyD: `c.mp3`, KeyF: `d.mp3`, KeyG: `e.mp3`,
    KeyH: `f.mp3`, KeyJ: `g.mp3`, KeyK: `a.mp3`,
    KeyL: `b.mp3`, KeyR: `c♯.mp3`, KeyT: `d♯.mp3`,
    KeyU: `f♯.mp3`,KeyI: `g♯.mp3`, KeyO: `a♯.mp3`,
};

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

//!-----------------Keyboard handler-----------------------------------//

window.addEventListener(`keydown`, e => {
    if (!e.repeat) {
        pianoKeyPress(e.code);
        pianoKeyPlaySound(e.code);
    }
});

function pianoKeyPress(code) {
    const pressedKey = document.querySelector(`.piano-key[data-code=${code}]`);
    pressedKey?.classList.add(`piano-key-active`);
}

function pianoKeyPlaySound(code) {
    if (code in SOUNDS) {
        new Audio('assets/audio/' + SOUNDS[code]).play();
    }
}

window.addEventListener(`keyup`, e => {
    pianoKeyRelease(e.code)
});

function pianoKeyRelease(code) {
    const pressedKey = document.querySelector(`.piano-key[data-code=${code}]`);
    pressedKey?.classList.remove(`piano-key-active`);
}

//!----------------Mouse click handler---------------------------------//

piano.addEventListener(`mousedown`, addPianoKeyResponse);

function addPianoKeyResponse(e) {
    pianoKeyResponse(e)
    pianoKeys.forEach(key => {
        key.addEventListener(`mouseover`, pianoKeyResponse)
        key.addEventListener(`mouseout`, pianoKeyLeave)
    })
}

function pianoKeyResponse(e) {
    if (e.target.classList.contains(`piano-key`)) {
        const code = e.target.dataset.code;
        pianoKeyPress(code);
        pianoKeyPlaySound(code);
    }
}

function pianoKeyLeave(e) {
    if (e.target.classList.contains(`piano-key`)) {
        const code = e.target.dataset.code;
        pianoKeyRelease(code);
    }
}

window.addEventListener(`mouseup`, removePianoKeyResponse);

function removePianoKeyResponse(e) {
    pianoKeyLeave(e);
    pianoKeys.forEach(key => {
        key.removeEventListener(`mouseover`, pianoKeyResponse)
        key.removeEventListener(`mouseout`, pianoKeyLeave)
    })
}