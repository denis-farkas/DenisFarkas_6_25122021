// eslint-disable-next-line no-unused-vars
function headerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserHeaderDOM() {
    const header = document.querySelector('.photograph_header');
    const headerLeft = document.createElement('div');
    headerLeft.className = 'photograph_header_left';
    const title = document.createElement('h1');
    title.textContent = name;
    title.setAttribute('role', 'heading');
    title.setAttribute('aria-label', `photographe ${name}`);
    const origin = document.createElement('div');
    origin.className = 'origin';
    origin.textContent = `${city}, ${country}`;
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.textContent = tagline;
    headerLeft.appendChild(title);
    headerLeft.appendChild(origin);
    headerLeft.appendChild(subtitle);
    const btn = document.createElement('button');
    btn.className = 'contact-button';
    btn.setAttribute('id', 'contacter');
    btn.setAttribute('onclick', 'displayContactModal()');
    btn.textContent = 'Contactez-moi';
    btn.setAttribute('role', 'link');
    btn.setAttribute('aria-label', 'contactez moi');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}`);
    img.setAttribute('role', 'img');
    img.setAttribute('aria-label', 'portrait');
    header.appendChild(headerLeft);
    header.appendChild(btn);
    header.appendChild(img);
    return header;
  }

  function getBadgeDOM() {
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.setAttribute('role', 'status');
    badge.setAttribute('aria-label', 'statut du photographe');

    const badgeLeft = document.createElement('div');
    badgeLeft.className = 'badge-left';
    badge.appendChild(badgeLeft);

    const like = document.createElement('div');
    like.className = 'like';
    like.setAttribute('id', 'total');
    like.setAttribute('role', 'status');

    const icon = document.createElement('i');
    icon.className = 'fa fa-heart black';
    icon.setAttribute('onclick', 'Liked(total)');
    badgeLeft.appendChild(like);
    badgeLeft.appendChild(icon);

    const badgeRight = document.createElement('div');
    badgeRight.className = 'badge-right';
    badge.appendChild(badgeRight);

    const span = document.createElement('span');
    span.className = 'price';
    span.setAttribute('role', 'status');
    span.setAttribute('aria-label', `${price}€ / jour`);
    span.textContent = `${price}€ / jour`;
    badgeRight.appendChild(span);

    return badge;
  }

  return { getUserHeaderDOM, getBadgeDOM };
}
