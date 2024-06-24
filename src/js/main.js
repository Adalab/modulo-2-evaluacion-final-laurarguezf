'use strict';

// QUERY SELECTOR

const cardsContainer = document.querySelector('.js_cards-container');

// DATOS

let data = [];
const placeholderImgURL = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';

// FUNCIONES

function createArticleForCharacter(oneCharacter) {

    if (oneCharacter.imageUrl) {
        const html = `<article class="characters_card">
                        <div class="card_img_container">
                            <img class="card_img" src=${oneCharacter.imageUrl} alt="">
                        </div>
                        <h2 class="card_text">${oneCharacter.name}</h2>
                     </article>`;
        return html;
    }
    else {
        const html = `<article class="characters_card">
                        <div class="card_img_container">
                            <img class="card_img" src=${placeholderImgURL} alt="">
                        </div>
                        <h2 class="card_text">${oneCharacter.name}</h2>
                     </article>`;
        return html;
    }
    
}

function renderCharacters() {
    let html = '';

    for (const oneCharacter of data) {
    html += createArticleForCharacter(oneCharacter);
    }

    cardsContainer.innerHTML = html;
}


// FUNCIONES DE EVENTOS (HANDLER)

// EVENTOS

// CÓDIGO CUANDO CARGA LA PÁGINA

fetch ('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(dataFromFetch => {
        data = dataFromFetch.data;        

    renderCharacters();   
});

