/* eslint-disable linebreak-style */

/* lecture du JSON pour la liste de photographes */ 
async function getPhotographers() {
        
  const response = await fetch("./data/photographers.json", {
    headers : { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
  const photographers = await response.json();
  return photographers;
}

/* utilisation des factories pour charger la page */
function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}


async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  const logo=document.querySelector(".logo");
  logo.focus();
}
    
init();
    
    