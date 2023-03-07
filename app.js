const grid = document.getElementById('grid');
const colorInput = document.getElementById('color-input');
const sizeInput = document.getElementById('size-input');
const modeButtons = [...document.getElementById('buttons').children];
const clearBtn = document.getElementById('clear');
const sizeLabel = document.getElementById('grid-size');

const INITIAL_SIZE = 16;
const INITIAL_COLOR = '#202020';

let currentSize = INITIAL_SIZE;
let currentColor = INITIAL_COLOR;

let mode = 'color';

let mouseDown = false;
document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup', () => mouseDown = false);

const paint = (e) => {
    if ((e.type === 'mouseover' && mouseDown) || e.type === 'click') {
        switch (mode) {
            case 'color':
                e.target.style = `background: ${currentColor}`;
                break;
            case 'rainbow':
                const randomR = Math.floor(Math.random() * 256);
                const randomG = Math.floor(Math.random() * 256);
                const randomB = Math.floor(Math.random() * 256);
                e.target.style = `background: rgb(${randomR}, ${randomG}, ${randomB})`;
                break;
            case 'eraser':
                e.target.style = `background: #fff`;
            default:
                break;
        }
    }
}

const gridSetup = () => {
    grid.style = `grid-template-columns: repeat(${currentSize}, 1fr); grid-template-rows: repeat(${currentSize}, 1fr)`;
    grid.innerHTML = '';
    for (let i = 0; i < currentSize * currentSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('click', paint);
        gridElement.addEventListener('mouseover', paint);
        grid.appendChild(gridElement);
    }
}

const modeUpdate = (e) => {
    mode = e.target.id;
    modeButtons.map(button => button.classList.remove('button-active'));
    modeButtons.filter(button => button.id === mode)[0].classList.add('button-active');
}

const colorUpdate = () => {
    currentColor = colorInput.value;
}

const clear = () => {
    [...grid.children].forEach(gridElement => gridElement.style = ``);
}

const reSize = () => {
    currentSize = sizeInput.value;
    gridSetup();
    sizeLabel.innerText = `${currentSize} x ${currentSize}`;
}

const addEventListeners = () => {
    modeButtons.forEach(button => button.addEventListener('click', modeUpdate));
    colorInput.addEventListener('change', colorUpdate);
    clearBtn.addEventListener('click', clear);
    sizeInput.addEventListener('change', reSize);
}

gridSetup();
addEventListeners();
