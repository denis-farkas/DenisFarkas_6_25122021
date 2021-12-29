
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
    return portfolios;
}


async function init(){
    const photographers = await getPhotographers();
    const idPhotographer = await getIdPhotographer();
    const onePhotographer = await getOnePhotographer(photographers, idPhotographer);
    const  portfolios  = await getPortfolios(photographers, idPhotographer);
    
    displayHeader(onePhotographer);
    displayPortfolio(portfolios);
    
};

init();

