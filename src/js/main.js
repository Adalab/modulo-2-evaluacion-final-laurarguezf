'use strict';

// QUERY SELECTOR

const cardsContainer = document.querySelector('.js_cards-container');
const favourtiesCardsContainer = document.querySelector('.js_favourites-container');
const searchButton = document.querySelector('.js_searchButton');
const characterInput = document.querySelector('.js_characterInput');

// DATOS

let data = [];
let favourites = [];
const placeholderImgURL = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';

// FUNCIONES

function createArticleForCharacter(oneCharacter) {

    if (oneCharacter.imageUrl) {
        const html = `<article class="characters_card js_characters_card" data-id="${oneCharacter._id}">
                        <div class="card_img_container">
                            <img class="card_img" src=${oneCharacter.imageUrl} alt="">
                        </div>
                        <h2 class="card_text">${oneCharacter.name}</h2>
                     </article>`;
        return html;
    }
    else {
        const html = `<article class="characters_card js_characters_card" data-id="${oneCharacter._id}">
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

    const allCharactersCards = document.querySelectorAll('.js_characters_card');

    for (const eachCard of allCharactersCards){
        eachCard.addEventListener( 'click', handleClickCard );
    }
}

function renderFavourites() {
    let html = '';

    for (const oneCharacter of favourites) {
    html += createArticleForCharacter(oneCharacter);
    }

    favourtiesCardsContainer.innerHTML = html;
}

// FUNCIONES DE EVENTOS (HANDLER)

function handleClickCard(ev) {
    
    const clickedCardElement = ev.currentTarget;
    console.log(clickedCardElement);
    clickedCardElement.classList.toggle('favourite');
    const clickedCardId = parseInt(clickedCardElement.dataset.id);
    console.log(clickedCardId);
    const clickedCard = data.find(eachCard => eachCard._id === clickedCardId);
    console.log(clickedCard);

    const clickedFavouriteIndex = favourites.find( eachFavourite => eachFavourite._id === clickedCardId);   

    if (clickedFavouriteIndex === undefined) {
        favourites.push(clickedCard);
        renderFavourites();
    }
    else {
        favourites.splice(clickedFavouriteIndex, 1);
        renderFavourites();
    }
}

function handleClickSearch(ev) {
    ev.preventDefault();
    const searchedCharacter = characterInput.value;
    console.log(searchedCharacter);

    fetch(`//api.disneyapi.dev/character?name=${searchedCharacter}`)
        .then (response => response.json())
        .then (dataFromOtherFetch => {
            data = dataFromOtherFetch.data;        

            renderCharacters();   
        });
}

// EVENTOS

searchButton.addEventListener( 'click', handleClickSearch);

// CÓDIGO CUANDO CARGA LA PÁGINA

fetch ('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(dataFromFetch => {
        data = dataFromFetch.data;        

    renderCharacters();   
    });

