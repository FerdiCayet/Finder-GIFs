const grid = document.querySelector(".grid");
let colcadeInstance;
let offset = 0;
let lastQuery = "";
const MAX_OFFSET = 499;
const LIMIT = 10;

function resetGrid() {
    grid.innerHTML = "";

    if (colcadeInstance) {
        colcadeInstance.destroy();
        colcadeInstance = null;
    }

    for (let i = 1; i <= Math.floor(window.innerWidth / 300); i++) {
        const col = document.createElement('div');
        col.classList.add('grid-col', `grid-col--${i}`);
        grid.appendChild(col);
    }
}

function renderGifs(images) {
    images.forEach(image => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const img = document.createElement('img');
        img.src = image.images.original.url;
        img.title = image.title;
        img.alt = image.alt_text;

        gridItem.appendChild(img);
        grid.appendChild(gridItem);
    });

    colcadeInstance = new Colcade(grid, {
        columns: '.grid-col',
        items: '.grid-item'
    });
}

document.querySelector("#search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.querySelector("#btnSearch").click();
    }
});

document.querySelector("#btnSearch").addEventListener("click", async () => {
    const value = document.querySelector("#search").value;

    if (!value) return;
    if (value !== lastQuery) offset = 0;

    try {
        const response = await fetch('/sendPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: value, offset })
        });

        const data = await response.json();
        if(document.querySelector("#container-error")){
            document.querySelector("#container-error").remove();
        }
        resetGrid();
        renderGifs(data.message);
        lastQuery = value;
        offset = Math.min(offset + LIMIT, MAX_OFFSET);
    }
    catch(error){
        console.error("Erro ao buscar GIFs:", error);
        grid.innerHTML = "";

        if(!document.querySelector("#container-error")){
            const containerError = document.createElement('div');
            containerError.setAttribute('id', 'container-error');
            const errorIcon = document.createElement('div');
            errorIcon.classList.add('error-icon');
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.innerText = "Erro ao buscar GIFs!\nTente novamente mais tarde.";
            containerError.appendChild(errorIcon);
            containerError.appendChild(errorMessage);
            grid.appendChild(containerError);
        }
    }
});