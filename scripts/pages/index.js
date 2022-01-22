/* eslint-disable no-undef */
/* lecture du JSON pour la liste de photographes */
async function getUsers() {
  const response = await fetch('./data/photographers.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const users = await response.json();
  return users;
}

/* utilisation des factories pour charger la page */
function displayData(users) {
  const usersSection = document.querySelector('.photographer_section');

  users.forEach((item) => {
    const userModel = userFactory(item);
    const userCardDOM = userModel.getUserCardDOM();
    usersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getUsers();
  displayData(photographers);
  const logo = document.querySelector('.logo');
  logo.focus();
}

init();
