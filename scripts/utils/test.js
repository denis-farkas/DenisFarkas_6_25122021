let idPhotographer = getIdPhotographer();

//fonction qui isole l'id dans l'url avec get
function getIdPhotographer () {
    const parameterURL = new URLSearchParams(window.location.search);
    const idPhotographer = parseInt(parameterURL.get('id'), 10);
    return idPhotographer;
}

//concaténation de "portfolio" avec idPhotographer pour nommer chaque portfolio dans localStorage
let portfolioId = "portfolios" + idPhotographer;

//lecture du JSON pour la liste de photographes

async function getPhotographers() {
        
    const response = await fetch('./data/photographers.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        });
    const photographers = await response.json();
    return photographers;
}

getPhotographers();

const photographers = photographers;
// Extrait de photographers, le photographe à afficher.

const onePhotographer = photographers.photographers.find(item=>item.id===idPhotographer);

//le garde dans localStorage à toute fin utile.
localStorage.setItem('onePhotographer', JSON.stringify(onePhotographer));



/* 1 - Si portfolio n'est pas déja en mémoire dans localStorage, filtre photographers.media avec idPhotographer pour 
retrouver la collection de médias qui lui appartiennent.

2 - applique un index avec map sur portfolio pour faciliter la construction future du slide.

3 - garde dans localStorage ce portfolio comme portfolioId

4 - Sinon, extrait portfolio de localStorage
*/

function getPortfolio(photographers, idPhotographer, portfolioId){

    if(!localStorage.getItem(portfolioId)){
        const portfolio = photographers.media.filter(item=>item.photographerId===idPhotographer);
    //Ajout d'un index pour faciliter l'affichage en slide
        const indexedPortfolio = portfolio.map((item, index)=>({index, ...item}));
        
        localStorage.setItem(portfolioId, JSON.stringify(indexedPortfolio));
    }
    const portfolio = JSON.parse(localStorage.getItem(portfolioId));
    
    return portfolio;
} 

let portfolio = getPortfolio(photographers, idPhotographer, portfolioId);

//utilisation des factories pour charger la page

//1 - Header et structure de la page
async function displayPhotographer(onePhotographer){
    const photographerMain = document.querySelector("main");
    const headerModel = headerFactory(onePhotographer);
    const userHeaderDOM = headerModel.getUserHeaderDOM();
    const userBodyDOM = headerModel.getUserBodyDOM();
    const portfolioSection = headerModel.getPortfolioSectionDOM();
    photographerMain.appendChild(userHeaderDOM);
    photographerMain.appendChild(userBodyDOM);
    userBodyDOM.appendChild(portfolioSection);
    }
// 2 - Modale de contact
async function displayModalContact(onePhotographer){
        const photographerBody =document.querySelector("body");
        const contactModel = modalContactFactory(onePhotographer);
        const userContactModalDOM = contactModel.getModalContactDOM();
        photographerBody.appendChild(userContactModalDOM);
    }

// 3 - Section Portfolio
async function displayPortfolio(collection){
    const portfolioBody = document.querySelector(".portfolio_body");
    collection.forEach((item) =>{
        const portfolioModel = portfolioItemFactory(item);
        const userPortfolioDOM = portfolioModel.getPortfolioCardDOM();
        portfolioBody.appendChild(userPortfolioDOM);
    });
   
}

// 4 - Structure de la modale lightbox
async function displayModalSection(){
    const modal = document.querySelector(".lightbox_modal");
    const modalModel = modalMediaFactory();
    const modalSection = modalModel.getModalMediaDOM();
    modal.appendChild(modalSection);
}

// 5 - chargement des slides de la modale lightbox
async function displayLightbox(portfolio) {
    const modalSection = document.querySelector(".body_center");
    portfolio.forEach((item) => {
        const modalMediaModel = modalMediaItemFactory(item);
        const mediaCardDOM = modalMediaModel.getMediaItemDOM();
        modalSection.appendChild(mediaCardDOM);
    });
};

//6 - calcule le totale de likes de portfolio
async function totalLiked(portfolio){
    let count=0;
    portfolio.forEach((item) =>{
        count = count + item.likes;
    });
    const Total = document.getElementById("total");
    Total.textContent = count;
}


async function init(onePhotographer, portfolio){
    await displayPhotographer(onePhotographer);
    await displayModalContact(onePhotographer);
    await displayPortfolio(portfolio);
    await displayModalSection();
    await displayLightbox(portfolio);
    await totalLiked(portfolio);
};

init(onePhotographer, portfolio);

/* Ouverture, fermeture des modales */

const contact = document.querySelector(".contact_modal");
const lightbox = document.querySelector(".lightbox_modal");
const photographerBody = document.querySelector(".photograph_body");

function displayContactModal(){
contact.style.display = "block";
}

function closeModal(){
contact.style.display = "none";
}

function closeLightbox(){
    lightbox.style.display ="none";
}


// fonction lightbox show slides

// controles
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

//fonction
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    if (n > slides.length-1) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length-1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    lightbox.style.display="block";
}

//fonction ajout de likes
function liked(id) {
    const like = document.getElementById(id);
    let likes = Number(like.textContent);
    incrementLikes= likes + 1;
    like.textContent = incrementLikes.toString();
}

/* Application de filtres */

//fonctions menu filtre
function sortPopular( a, b ) {
    if(a.likes > b.likes){
        return -1;
    }
    if(a.likes < b.likes){
        return 1;
    }
    return 0 
}

function sortRecent( a, b ) {
    if(a.date > b.date){
        return -1;
    }
    if(a.date < b.date){
        return 1;
    }
    return 0 
}

function sortTitle( a, b ) {
    if(a.title > b.title){
        return 1;
    }
    if(a.title < b.title){
        return -1;
    }
    return 0 
}

// Gestion des filtres selon option choisie.
function sortFilter(value){

    if(value === 0){
        let filter = portfolio.sort(sortPopular);
        return filter;
    }else if(value === 1){
        let filter = portfolio.sort(sortRecent);
        return filter;
    }else if(value === 2){
        let filter = portfolio.sort(sortTitle);
        return filter;
    }else{
        let filter = portfolio;
        return filter;
    }
    
}

// Application des filtres.

function  changeFilter(value){
console.log(value);
const portfolioBody = document.querySelector(".portfolio_body");
const filter = sortFilter(value);
portfolioBody.innerHTML=""
displayPortfolio(filter);
displayLightbox(filter);

}




