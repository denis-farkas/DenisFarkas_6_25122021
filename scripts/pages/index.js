/* eslint-disable no-undef */
/* lecture du JSON pour la liste de photographes */

// eslint-disable-next-line consistent-return
async function getUsers() {
  try {
    const response = await fetch('./data/photographers.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const users = await response.json();
    return users;
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert('erreur systéme, le fichier json comporte des erreurs');
  }
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
  try {
    // Récupère les datas des photographes
    const { photographers } = await getUsers();
    displayData(photographers);
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert('erreur systéme, le fichier json comporte des erreurs');
  }
}

init();
