// eslint-disable-next-line no-unused-vars
function userFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    article.setAttribute('role', 'article');
    article.setAttribute('aria-label', `Fiche du photographe ${name}`);

    const img = document.createElement('img');

    img.setAttribute('src', picture);
    img.setAttribute('alt', 'portrait du photographe');

    const nom = document.createElement('h2');

    nom.textContent = name;
    nom.setAttribute('aria-label', `${name}`);

    const adress = document.createElement('h3');

    adress.setAttribute('aria-label', `localisation ${city}, ${country}`);
    adress.textContent = `${city}, ${country}`;

    const devise = document.createElement('p');

    devise.className = 'subTitle';
    devise.textContent = tagline;

    const prix = document.createElement('span');

    prix.className = 'price';
    prix.textContent = `${price}€/jour`;

    const lien = document.createElement('a');

    lien.setAttribute('role', 'link');
    lien.setAttribute('href', `photographer.html?id=${id}`);
    lien.setAttribute('aria-label', `visiter la page de ${name}`);

    article.appendChild(lien);
    lien.appendChild(img);
    lien.appendChild(nom);
    article.appendChild(adress);
    article.appendChild(devise);
    article.appendChild(prix);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
