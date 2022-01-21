/* eslint-disable linebreak-style */

/* lecture du JSON pour la liste de photographes */ 
async function getUsers() {
        
  const response = await fetch("./data/photographers.json", {
    headers : { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
  const users = await response.json();
  return photographers;
}

/* utilisation des factories pour charger la page */
function displayData(users) {
  const photographersSection = document.querySelector(".photographer_section");

  users.forEach((user) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(user);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}


async function init() {
  // Récupère les datas des photographes
  const { users } = await getUsers();
  displayData(users);
  const logo=document.querySelector(".logo");
  logo.focus();
}
    
init();
    
    