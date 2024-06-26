'use strict';


// QUERY SELECTOR

const cardsContainer = document.querySelector('.js_cards-container');
const favourtiesCardsContainer = document.querySelector('.js_favourites-container');
const searchButton = document.querySelector('.js_searchButton');
const characterInput = document.querySelector('.js_characterInput');
const clearFavouritesButton = document.querySelector('.js_clearButton');
const resetSearchButton = document.querySelector('.js_resetButton');
const logButton = document.querySelector('.js_logButton');


// DATOS

let data = [];
let favourites = [];
const placeholderImgURL = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
const peliculas = 'Doesnt appear in any movie';


// FUNCIONES

function createArticleForCharacter(oneCharacter) {
    //Función para crear el HTML de cada tarjeta de personaje
    const numPeliculas = oneCharacter.films.length;
    console.log(numPeliculas);


    const html = `<article class="characters_card js_characters_card" data-id="${oneCharacter._id}">
                    <div class="card_img_container">
                        <img class="card_img" src=${oneCharacter.imageUrl ? oneCharacter.imageUrl : placeholderImgURL} alt="">
                    </div>
                    <h2 class="card_text">${oneCharacter.name}</h2>
                    <p>${(oneCharacter.films.length === 0) ? peliculas : oneCharacter.films.length}</p>
                 </article>`;
    return html;   
}

function renderCharacters() {
    //Función para renderizar los personajes en la sección de personajes
    let html = '';

    for (const oneCharacter of data) {
    html += createArticleForCharacter(oneCharacter);
    }

    cardsContainer.innerHTML = html;

    //Agregar event listener a cada tarjeta de personaje
    const allCharactersCards = document.querySelectorAll('.js_characters_card');
    
    for (const eachCard of allCharactersCards){
        eachCard.addEventListener( 'click', handleClickCard );
    };
}

function renderFavourites() {
    //Función para renderizar los favoritos
    let html = '';

    for (const oneCharacter of favourites) {
    html += createArticleForCharacter(oneCharacter);
    }

    favourtiesCardsContainer.innerHTML = html;
}

function removeFavouriteBackgroundColor() {
    //Función para eliminar el color de fondo para las tarjetas que lo tengan
    const allCards = document.querySelectorAll('.js_characters_card');

    for (const eachCard of allCards) {
        eachCard.classList.remove('favourite');
    }
}

function addFavouriteBackgroundColor() {
    const allCards = document.querySelectorAll('.js_characters_card');

        for (const eachCard of allCards) {
            //debugger;
            const cardId = parseInt(eachCard.dataset.id);
            const isFav = favourites.find(fav => fav._id === cardId);

             if (isFav) {
                 eachCard.classList.add('favourite');
             };
        }
}


// FUNCIONES DE EVENTOS (HANDLER)

function handleClickCard(ev) {
    //Función para manejar el click en una tarjeta de personaje (agregar/quitar favorito)

    const clickedCardElement = ev.currentTarget;
    console.log(clickedCardElement);
    clickedCardElement.classList.toggle('favourite');
    const clickedCardId = parseInt(clickedCardElement.dataset.id);
    console.log(clickedCardId);
    const clickedCard = data.find(eachCard => eachCard._id === clickedCardId);
    console.log(clickedCard);

    const clickedFavouriteIndex = favourites.findIndex( eachFavourite => eachFavourite._id === clickedCardId);   

    if (clickedFavouriteIndex === -1) {
        favourites.push(clickedCard);
    }
    else {
        favourites.splice(clickedFavouriteIndex, 1);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
    addFavouriteBackgroundColor();
}

function handleClickSearch(ev) {
    //Función para manejar la búsqueda de personajes
    ev.preventDefault();
    const searchedCharacter = characterInput.value;
    console.log(searchedCharacter);

    fetch(`//api.disneyapi.dev/character?name=${searchedCharacter}`)
        .then (response => response.json())
        .then (dataFromOtherFetch => {
            data = dataFromOtherFetch.data;        

            renderCharacters();
            addFavouriteBackgroundColor();   
        });
}

function handleClickClearAllFavourites(ev) {
    //Función para borrar todos los favoritos de su sección y del localStorage
    favourites = [];
    localStorage.removeItem('favourites');
    renderFavourites();
    removeFavouriteBackgroundColor();
}

function handleClickResetSearch(ev) {
    //Función que resetea la búsqueda mostrando todas las tarjetas de nuevo
    ev.preventDefault();
    characterInput.value = '';
    fetch ('//api.disneyapi.dev/character?pageSize=50')
        .then(response => response.json())
        .then(dataFromFetch => {
            data = dataFromFetch.data;        


        renderCharacters();
        addFavouriteBackgroundColor();

        });
};

function handleClickLog(ev) {
    ev.preventDefault();
    console.log(`Tienes ${favourites.length} favoritos`);
}


// EVENTOS

searchButton.addEventListener( 'click', handleClickSearch);
clearFavouritesButton.addEventListener( 'click', handleClickClearAllFavourites);
resetSearchButton.addEventListener( 'click', handleClickResetSearch);
logButton.addEventListener( 'click' , handleClickLog);


// CÓDIGO CUANDO CARGA LA PÁGINA

fetch ('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(dataFromFetch => {
        data = dataFromFetch.data;        

    renderCharacters();
    addFavouriteBackgroundColor();   
    });

const favouritesFromLocalStorage = JSON.parse(localStorage.getItem('favourites'));

if (favouritesFromLocalStorage !== null) {
    favourites = favouritesFromLocalStorage;

    renderFavourites();
};