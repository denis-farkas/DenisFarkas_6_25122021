/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

/* les factories principalement ont causé ces problémes, je désactive */

const contact = document.querySelector('.contact_modal');
const lightbox = document.querySelector('.lightbox_modal');
const userHeader = document.querySelector('.photograph');
const userBody = document.querySelector('.photograph_body');
const main = document.querySelector('.main');
const idUser = getIdUser();

/* concaténation de "portfolio" avec idUser pour nommer chaque portfolio dans localStorage */
const idPortfolio = `portfolio${idUser}`;

/* fonction qui isole l'id dans l'url avec get */
function getIdUser() {
  const parameterURL = new URLSearchParams(window.location.search);
  const idUser = parseInt(parameterURL.get('id'), 10);
  return idUser;
}

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
    console.error(err);
  }
}

/* utilisation des factories pour charger la page */

/* 1 - Header et structure de la page */
function displayUser(oneUser) {
  const userMain = document.querySelector('main');
  // eslint-disable-next-line no-undef
  const headerModel = headerFactory(oneUser);
  const userHeaderDOM = headerModel.getUserHeaderDOM();
  const userBodyDOM = headerModel.getUserBodyDOM();
  const portfolioSection = headerModel.getPortfolioSectionDOM();
  userMain.appendChild(userHeaderDOM);
  userMain.appendChild(userBodyDOM);
  userBodyDOM.appendChild(portfolioSection);
}

/* 2 - Modale de contact */
function displayModalContact(oneUser) {
  const userBody = document.querySelector('body');
  // eslint-disable-next-line no-undef
  const contactModel = modalContactFactory(oneUser);
  const userContactModalDOM = contactModel.getModalContactDOM();
  userBody.appendChild(userContactModalDOM);
}

/* 3 - Section Portfolio */
function displayPortfolio(collection) {
  const portfolioBody = document.querySelector('.portfolio_body');
  collection.forEach((item) => {
    // eslint-disable-next-line no-undef
    const portfolioModel = portfolioItemFactory(item);
    const userPortfolioDOM = portfolioModel.getPortfolioCardDOM();
    portfolioBody.appendChild(userPortfolioDOM);
  });
}

/* Extrait de users, le photographe à afficher. */
function getOneUser(users, idUser) {
  const oneUser = users.photographers.find((item) => item.id === idUser);
  return oneUser;
}

/* 1 - Si portfolio n'est pas déja en mémoire dans localStorage, filtre users.media avec idUser pour 
retrouver la collection de médias qui lui appartiennent.

2 - applique un index avec map sur portfolio pour faciliter la construction future du slide.

3 - garde dans localStorage ce portfolio comme portfolioId

4 - Sinon, extrait portfolio de localStorage
*/
function getPortfolio(users, idUser, idPortfolio) {
  if (!localStorage.getItem(idPortfolio)) {
    const portfolio = users.media.filter(
      (item) => item.photographerId === idUser
    );

    const indexedPortfolio = portfolio.map((item, index) => ({
      index,
      ...item,
    }));

    localStorage.setItem(idPortfolio, JSON.stringify(indexedPortfolio));
  }
  const portfolio = JSON.parse(localStorage.getItem(idPortfolio));

  return portfolio;
}

/* Structure de la modale ligthbox */
function displayModalSection() {
  const modal = document.querySelector('.lightbox_modal');

  // eslint-disable-next-line no-undef
  const modalModel = modalMediaFactory();
  const modalSection = modalModel.getModalMediaDOM();
  modal.appendChild(modalSection);
}

/* Chargement des slides de la modale lightbox */
function displayLightbox(portfolio) {
  const modalSection = document.querySelector('.body_center');

  portfolio.forEach((item) => {
    // eslint-disable-next-line no-undef
    const modalMediaModel = modalMediaItemFactory(item);
    const mediaCardDOM = modalMediaModel.getMediaItemDOM();
    modalSection.appendChild(mediaCardDOM);
  });
}

/* calcule le totale de likes du portfolio */
function totalLiked(portfolio) {
  let count = 0;
  const Total = document.getElementById('total');

  portfolio.forEach((item) => {
    count += item.likes;
  });

  Total.textContent = count;
}

/* Chargement de la page et de ses fonctionnalités */

async function init(idUser, idPortfolio) {
  try {
    const users = await getUsers();
    const oneUser = getOneUser(users, idUser);
    localStorage.setItem('oneUser', JSON.stringify(oneUser));
    const portfolio = getPortfolio(users, idUser, idPortfolio);
    displayUser(oneUser);
    displayModalContact(oneUser);
    displayPortfolio(portfolio);
    displayModalSection();
    displayLightbox(portfolio);
    totalLiked(portfolio);
  } catch (err) {
    console.error(err);
  }
}

init(idUser, idPortfolio);

/* Ouverture, fermeture des modales */

function closeContactModal() {
  const contactBtn = document.getElementById('contacter');

  document.removeEventListener('keyup', checkCloseModal, false);
  // enlever inert des childs
  lightbox.inert = false;
  userHeader.inert = false;
  main.inert = false;

  contact.style.display = 'none';

  contactBtn.focus();
}

function checkCloseModal(e) {
  if (e.key === 'Escape') {
    closeContactModal();
  }
}

function displayContactModal() {
  lightbox.inert = true;
  userHeader.inert = true;
  main.inert = true;

  contact.style.display = 'block';
  document.addEventListener('keyup', checkCloseModal);

  const form = document.querySelector('h2');
  form.focus();
}

/* fonctions lightbox */

// fonction open/close lightbox

function closeLightBox() {
  document.removeEventListener('keydown', checkLightBox, false);
  // enlever inert des childs
  contact.inert = false;
  userHeader.inert = false;
  main.inert = false;

  lightbox.style.display = 'none';
}

function checkOnKeyImg(e, index) {
  if (e.keyCode === 13) {
    currentSlide(index);
  }
}

function checkLightBox(e) {
  switch (e.keyCode) {
    case 37:
      plusSlides(-1);
      break;
    case 39:
      plusSlides(1);
      break;
    case 27:
      closeLightBox();
      break;
    default:
    // do nothing
  }
}

// fonction show slides
let slideIndex;

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let counter;
  const slides = document.getElementsByClassName('slides');
  if (n > slides.length - 1) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  // eslint-disable-next-line no-plusplus
  for (counter = 0; counter < slides.length; counter++) {
    slides[counter].style.display = 'none';
  }

  contact.inert = true;
  userHeader.inert = true;
  main.inert = true;

  slides[slideIndex].style.display = 'block';
  lightbox.style.display = 'block';
  document.addEventListener('keydown', checkLightBox);
}

// fonction incrémente likes

function liked(id) {
  const like = document.getElementById(id);
  const total = document.getElementById('total');
  const likes = Number(like.textContent);
  const totalLikes = Number(total.textContent);
  const incrementLikes = likes + 1;
  const incrementTotal = totalLikes + 1;
  like.textContent = incrementLikes.toString();
  total.textContent = incrementTotal.toString();
}

// fonction menu filtre
function sortPopular(a, b) {
  if (a.likes > b.likes) {
    return -1;
  }
  if (a.likes < b.likes) {
    return 1;
  }
  return 0;
}

function sortRecent(a, b) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}

function sortTitle(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

// Gestion des filtres selon option choisie.
function sortFilter(value, portfolio) {
  if (value === 'Popularité') {
    const filter = portfolio.sort(sortPopular);
    return filter;
  }
  if (value === 'Date') {
    const filter = portfolio.sort(sortRecent);
    return filter;
  }

  if (value === 'Titre') {
    const filter = portfolio.sort(sortTitle);
    return filter;
  }

  const filter = portfolio;
  return filter;
}

// Application des filtres.

function changeFilter(value) {
  const portfolio = JSON.parse(localStorage.getItem(idPortfolio));
  const portfolioBody = document.querySelector('.portfolio_body');

  const filter = sortFilter(value, portfolio);

  portfolioBody.innerHTML = '';
  displayPortfolio(filter);
  displayLightbox(filter);
}

/* affiche en console les valeurs du formulaire  rempli lors du submit */

// eslint-disable-next-line no-unused-vars
function printInputValues() {
  const inpFirst = document.getElementById('first');
  const inpLast = document.getElementById('last');
  const inpEmail = document.getElementById('email');
  const inpMessage = document.getElementById('message');
  console.log(inpFirst.value, inpLast.value, inpEmail.value, inpMessage.value);
}
