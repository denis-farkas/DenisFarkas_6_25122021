
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

async function getIdPhotographer () {
    const parameterURL = new URLSearchParams(window.location.search);
    const idPhotographer = parseInt(parameterURL.get('id'), 10);
    return idPhotographer;

    }

async function displayHeader(onePhotographer){
    const photographerMain = document.querySelector("main");
    const headerModel = headerFactory(onePhotographer);
    const userHeaderDOM = headerModel.getUserHeaderDOM();
    const userBodyDOM = headerModel.getUserBodyDOM();
    const portfolioSection = headerModel.getPortfolioSectionDOM();
    photographerMain.appendChild(userHeaderDOM);
    photographerMain.appendChild(userBodyDOM);
    photographerMain.appendChild(portfolioSection);
   
    }

async function displayModalContact(onePhotographer){
        const photographerBody =document.querySelector("body");
        const contactModel = modalContactFactory(onePhotographer);
        const userContactModalDOM = contactModel.getModalContactDOM();
        photographerBody.appendChild(userContactModalDOM);
    }


async function displayPortfolio(portfolios){
    const portfolioBody = document.querySelector(".portfolio_body");
    portfolios.forEach((item) =>{
        const portfolioModel = portfolioItemFactory(item);
        const userPortfolioDOM = portfolioModel.getPortfolioCardDOM();
        portfolioBody.appendChild(userPortfolioDOM);
    });
   
}

async function getOnePhotographer(photographers, idPhotographer){
    const onePhotographer = photographers.photographers.find(item=>item.id===idPhotographer);
    return onePhotographer;
}

async function getPortfolios(photographers, idPhotographer){
    const portfolios = photographers.media.filter(item=>item.photographerId===idPhotographer);
    //Ajout d'un index pour faciliter l'affichage en slide
    const indexedPortfolios = portfolios.map((item, index)=>({index, ...item}));
    
    return indexedPortfolios;
}

async function displayModalSection(){
    const modal = document.querySelector(".lightbox_modal");
    const modalModel = modalMediaFactory();
    const modalSection = modalModel.getModalMediaDOM();
    modal.appendChild(modalSection);
}

function displayLightbox() {
    const modalSection = document.querySelector(".body_center");
    const portfolios =  JSON.parse(localStorage.getItem( 'portfolios'));
    portfolios.forEach((item) => {
        const modalMediaModel = modalMediaItemFactory(item);
        const mediaCardDOM = modalMediaModel.getMediaItemDOM();
        modalSection.appendChild(mediaCardDOM);
    });
};





 

async function init(){
    const photographers = await getPhotographers();
    const idPhotographer = await getIdPhotographer();
    const onePhotographer = await getOnePhotographer(photographers, idPhotographer);
    localStorage.setItem('onePhotographer', JSON.stringify(onePhotographer));
    const  portfolios  = await getPortfolios(photographers, idPhotographer);
    localStorage.setItem('portfolios', JSON.stringify(portfolios));
    displayHeader(onePhotographer);
    displayModalContact(onePhotographer);
    displayPortfolio(portfolios);
    displayModalSection();
    displayLightbox();
};

init();

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
    

