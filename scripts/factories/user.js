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

    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.setAttribute('aria-label', `${name}`);

    const h3 = document.createElement('h3');
    h3.setAttribute('aria-label', `localisation ${city}, ${country}`);
    h3.textContent = `${city}, ${country}`;

    const p = document.createElement('p');
    p.className = 'subTitle';
    p.textContent = tagline;

    const spanOther = document.createElement('span');
    spanOther.className = 'price';
    spanOther.textContent = `${price}€/jour`;

    const a = document.createElement('a');
    a.setAttribute('role', 'link');
    a.setAttribute('href', `photographer.html?id=${id}`);
    a.setAttribute('aria-label', `visiter la page de ${name}`);

    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(spanOther);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
