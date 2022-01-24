// eslint-disable-next-line no-unused-vars
function portfolioItemFactory(data) {
  const { index, id, title, altText, image, video, likes } = data;

  function getPortfolioCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('role', 'article');
    article.setAttribute('id', `article${id}`);
    article.setAttribute(
      'aria-label',
      `image numéro ${id} titre ${title} avec ${likes} likes`
    );

    const lightBoxLink = document.createElement('a');
    lightBoxLink.setAttribute('role', 'link');
    lightBoxLink.setAttribute('id', `lightLink${id}`);
    lightBoxLink.setAttribute('href', `#lightLink${id}`);
    lightBoxLink.setAttribute('onclick', `currentSlide(${index})`);
    lightBoxLink.setAttribute('onkeydown', `checkOnKeyImg(${index})`);
    lightBoxLink.setAttribute('aria-label', `voir le slide de ${title}`);
    lightBoxLink.setAttribute('tabindex', '0');
    article.appendChild(lightBoxLink);

    if (image) {
      const img = document.createElement('img');
      img.setAttribute('src', `assets/media/${image}`);
      img.setAttribute('aria-label', `${altText}`);
      img.setAttribute('role', 'img');
      lightBoxLink.appendChild(img);
    } else if (video) {
      const vid = document.createElement('video');
      vid.setAttribute('src', `assets/media/${video}`);
      vid.setAttribute('aria-label', `${altText}`);
      lightBoxLink.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', 'assets/media/imageneutre.jpg');
    }

    const row = document.createElement('div');
    row.className = 'row';
    article.appendChild(row);

    const description = document.createElement('span');
    description.textContent = `${title}`;
    description.className = 'describe';
    row.appendChild(description);

    const rightSide = document.createElement('div');
    rightSide.className = 'right-side';
    row.appendChild(rightSide);

    const like = document.createElement('div');
    like.className = 'likes';
    like.textContent = `${likes}`;
    like.setAttribute('id', `${id}`);

    const likeZone = document.createElement('span');
    likeZone.setAttribute('onkeyup', `checkOnKeyLiked(${id})`);
    likeZone.setAttribute(
      'aria-label',
      `augmenter le total de like qui est ${likes}`
    );
    likeZone.setAttribute('tabindex', '0');

    const icon = document.createElement('i');
    icon.className = 'fa fa-heart';
    icon.setAttribute('role', 'img');
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('aria-label', 'clicker ou enter ajoute un like');
    icon.setAttribute('onclick', `liked(${id})`);
    icon.setAttribute('onkeypress', `liked(${id})`);

    rightSide.appendChild(like);
    rightSide.appendChild(icon);

    return article;
  }
  return { getPortfolioCardDOM };
}
