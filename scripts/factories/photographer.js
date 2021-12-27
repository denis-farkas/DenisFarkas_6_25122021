function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
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

function headerFactory(data) {
  const { name, portrait, city, country, tagline } = data;
  const main = document.querySelector("main");
  const picture = `assets/photographers/${portrait}`;
  function getUserHeaderDOM() {
    const header =document.createElement("div");
    header.className="photograph-header";
    main.appendChild(header);
    const headerLeft = document.createElement("div");
    headerLeft.className = "photograph-header-left";
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h6 = document.createElement("h6");
    h6.textContent = `${city}, ${country}`;
    const p = document.createElement("p");
    p.className ="subTitle";
    p.textContent = tagline;
    headerLeft.appendChild(h2);
    headerLeft.appendChild(h6);
    headerLeft.appendChild(p);
    const btn = document.createElement("button");
    btn.className = "contact-button";
    btn.setAttribute("onclick", "displayModal()")
    btn.textContent="Contactez-moi";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    header.appendChild(headerLeft);
    header.appendChild(btn);
    header.appendChild(img);
    return header;
  }
  return{getUserHeaderDOM};

}

