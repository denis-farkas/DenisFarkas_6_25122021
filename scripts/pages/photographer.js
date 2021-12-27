
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

async function displayPage(onePhotographer){
    const photographerMain = document.querySelector("main");
    const headerModel = headerFactory(onePhotographer);
    const userHeaderDOM = headerModel.getUserHeaderDOM();
    photographerMain.appendChild(userHeaderDOM);
    }

async function init(){
    const photographers = await getPhotographers();
    const idPhotographer = await getIdPhotographer();
    const onePhotographer = photographers.photographers.find(item=>item.id===idPhotographer);
    displayPage(onePhotographer);
};

init();