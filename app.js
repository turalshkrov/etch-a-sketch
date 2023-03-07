const grid = document.getElementById('grid');

let sizeOfGrid = 16;
let i = 0;

for (let i = 0; i < sizeOfGrid * sizeOfGrid; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    grid.appendChild(gridElement);

}