
 let idPhotographer = getIdPhotographer();

 
/*concaténation de "portfolio" avec idPhotographer pour nommer chaque portfolio dans localStorage*/
 let idPortfolio = "portfolio"+idPhotographer;

/*fonction qui isole l'id dans l'url avec get*/
 function getIdPhotographer () {
    const parameterURL = new URLSearchParams(window.location.search);
    const idPhotographer = parseInt(parameterURL.get('id'), 10);
    return idPhotographer;
    }
 
/*lecture du JSON pour la liste de photographes*/   
 async function getPhotographers() {
        
    const response = await fetch('./data/photographers.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        });
    const photographers = await response.json()
    return photographers;
    }

/* utilisation des factories pour charger la page */

/* 1 - Header et structure de la page */ 
function displayPhotographer(onePhotographer){
    const photographerMain = document.querySelector("main");
    const headerModel = headerFactory(onePhotographer);
    const userHeaderDOM = headerModel.getUserHeaderDOM();
    const userBodyDOM = headerModel.getUserBodyDOM();
    const portfolioSection = headerModel.getPortfolioSectionDOM();
    photographerMain.appendChild(userHeaderDOM);
    photographerMain.appendChild(userBodyDOM);
    userBodyDOM.appendChild(portfolioSection);
    }

/* 2 - Modale de contact */   
function displayModalContact(onePhotographer){
    const photographerBody =document.querySelector("body");
    const contactModel = modalContactFactory(onePhotographer);
    const userContactModalDOM = contactModel.getModalContactDOM();
    photographerBody.appendChild(userContactModalDOM);
}

/* 3 - Section Portfolio */ 
 function displayPortfolio(collection){
    const portfolioBody = document.querySelector(".portfolio_body");
    collection.forEach((item) =>{
        const portfolioModel = portfolioItemFactory(item);
        const userPortfolioDOM = portfolioModel.getPortfolioCardDOM();
        portfolioBody.appendChild(userPortfolioDOM);
    });
   
}

/* Extrait de photographers, le photographe à afficher. */
function getOnePhotographer(photographers, idPhotographer){
    const onePhotographer = photographers.photographers.find(item=>item.id===idPhotographer);
    return onePhotographer;
}

/* 1 - Si portfolio n'est pas déja en mémoire dans localStorage, filtre photographers.media avec idPhotographer pour 
retrouver la collection de médias qui lui appartiennent.

2 - applique un index avec map sur portfolio pour faciliter la construction future du slide.

3 - garde dans localStorage ce portfolio comme portfolioId

4 - Sinon, extrait portfolio de localStorage
*/
function getPortfolio(photographers, idPhotographer, idPortfolio){
    
    if(!localStorage.getItem(idPortfolio)){
        const portfolio = photographers.media.filter(item=>item.photographerId===idPhotographer);
    
        const indexedPortfolio = portfolio.map((item, index)=>({index, ...item}));
        
        localStorage.setItem(idPortfolio, JSON.stringify(indexedPortfolio));
    }
    const portfolio = JSON.parse(localStorage.getItem(idPortfolio));
    
    return portfolio;
}

/* Structure de la modale ligthbox */
function displayModalSection(){
    const modal = document.querySelector(".lightbox_modal");
    const modalModel = modalMediaFactory();
    const modalSection = modalModel.getModalMediaDOM();
    modal.appendChild(modalSection);
}


/* Chargement des slides de la modale lightbox */
function displayLightbox(portfolio) {
    const modalSection = document.querySelector(".body_center");
    portfolio.forEach((item) => {
        const modalMediaModel = modalMediaItemFactory(item);
        const mediaCardDOM = modalMediaModel.getMediaItemDOM();
        modalSection.appendChild(mediaCardDOM);
    });
};


/* Chargement de la page et de ses fonctionnalités */

async function init(idPhotographer, idPortfolio){
    
    const photographers = await getPhotographers();
    const onePhotographer = getOnePhotographer(photographers, idPhotographer);
    localStorage.setItem('onePhotographer', JSON.stringify(onePhotographer));
    const portfolio = getPortfolio(photographers, idPhotographer, idPortfolio);
    displayPhotographer(onePhotographer);
    displayModalContact(onePhotographer);
    displayPortfolio(portfolio);
    displayModalSection();
    displayLightbox(portfolio);
    totalLiked(portfolio);
};

init(idPhotographer, idPortfolio);



/*calcule le totale de likes du portfolio */
function totalLiked(portfolio){
    let count=0;
    portfolio.forEach((item) =>{
        count = count + item.likes;
    });
    const Total = document.getElementById("total");
    Total.textContent = count;
}


/* Ouverture, fermeture des modales */

const contact = document.querySelector(".contact_modal");
const lightbox = document.querySelector(".lightbox_modal");
const photographerBody = document.querySelector(".photograph_body");

function displayContactModal(){
contact.style.display = "block";
contact.setAttribute("aria-modal", "true");
}

function closeModal(){
contact.style.display = "none";
}

function closeLightbox(){
    lightbox.style.display ="none";
}


//fonction lightbox show slides

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

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

//fonction incrémente likes
function liked(id) {
    const like = document.getElementById(id);
    const total = document.getElementById("total");
    let likes = Number(like.textContent);
    let totalLikes = Number(total.textContent);
    incrementLikes= likes + 1;
    incrementTotal= totalLikes +1;
    like.textContent = incrementLikes.toString();
    total.textContent = incrementTotal.toString();
}

//fonction menu filtre
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
function sortFilter(value, portfolio){

    if(value === "Popularité"){
        let filter = portfolio.sort(sortPopular);
        return filter;
    }else if(value === "Date"){
        let filter = portfolio.sort(sortRecent);
        return filter;
    }else if(value === "Titre"){
        let filter = portfolio.sort(sortTitle);
        return filter;
    }else{
        let filter = portfolio;
        return filter;
    }
    
}

// Application des filtres.
function  changeFilter(value){
const portfolio = JSON.parse(localStorage.getItem(idPortfolio));
const portfolioBody = document.querySelector(".portfolio_body");

const filter = sortFilter(value, portfolio);

portfolioBody.innerHTML=""
displayPortfolio(filter);
displayLightbox(filter);
}






/* affiche en console les valeurs du formulaire  rempli lors du submit */

function printInputValues(){
    const inpFirst = document.getElementById("first");
    const inpLast = document.getElementById("last");
    const inpEmail = document.getElementById("email");
    const inpMessage = document.getElementById("message");
    console.log( inpFirst.value, inpLast.value, inpEmail.value, inpMessage.value);
}


