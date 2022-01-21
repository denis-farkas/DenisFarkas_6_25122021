/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
function portfolioItemFactory(data) {
  const { index, id, title, image, video, likes} = data;
    
  function getPortfolioCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("role", "article");
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-label", `image numéro ${id} titre ${title} avec ${likes} likes`);
    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", `assets/media/${image}`);
      img.setAttribute("alt", `${title}`);
      img.setAttribute("role", "link");
      img.setAttribute("aria-label", `photographie ${title}`);
      img.setAttribute("onclick", `currentSlide(${index})`);
      article.appendChild(img);
    } else if (video) {
      const vid = document.createElement("video");
      vid.setAttribute("src", `assets/media/${video}`);
      vid.setAttribute("role", "link");
      vid.setAttribute("aria-label", `vidéo ${title}`);
      vid.setAttribute("autoplay",false);
      vid.setAttribute("onclick", `currentSlide(${index})`);
      article.appendChild(vid);
    }
    const row = document.createElement("div");
    row.className="row";
    article.appendChild(row);
    const span = document.createElement("span");
    span.textContent = `${title}`;
    span.className="describe";
    span.setAttribute("role", "link");
    span.setAttribute("aria-label", `${title}`);
    span.setAttribute("onclick", `currentSlide(${index})`);
    row.appendChild(span);
    const rightSide = document.createElement("div");
    rightSide.className="right-side";
    row.appendChild(rightSide);
    const like = document.createElement("div");
    like.className="likes";
    like.textContent = `${likes}`;
    like.setAttribute("role", "timer");
    like.setAttribute("aria-label",`Total de j'aime ${likes}`);
    like.setAttribute("id", `${id}`);
    const i = document.createElement("i");
    i.className="fa fa-heart";
    i.setAttribute("role", "img");
    i.setAttribute("tabindex","0");
    i.setAttribute("aria-label", "clicker ou enter ajoute un like");
    i.setAttribute("onclick", `liked(${id})`);
    i.setAttribute("onkeypress",`liked(${id})`);
    rightSide.appendChild(like);
    rightSide.appendChild(i);
    return article;
  }
  return {getPortfolioCardDOM};
    
}