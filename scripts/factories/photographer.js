function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h6 = document.createElement("h6");
    h6.textContent = `${city}, ${country}`;
    const p = document.createElement("p");
    p.className ="subTitle";
    p.textContent = tagline;
    const span = document.createElement("span");
    span.className="price";
    span.textContent = `${price}€/jour`;
    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}`)
    a.className="streched-link";
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h6);
    article.appendChild(p);
    article.appendChild(span);
    article.append(a);
    return article;
  }
  return { name, picture, getUserCardDOM };
}






