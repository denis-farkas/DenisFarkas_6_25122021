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

    const span = document.createElement('span');
    span.className = 'price';
    span.textContent = `${price}€/jour`;

    const link = document.createElement('a');
    link.setAttribute('role', 'link');
    link.setAttribute('href', `photographer.html?id=${id}`);
    link.setAttribute('aria-label', `visiter la page de ${name}`);

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
