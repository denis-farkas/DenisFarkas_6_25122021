// eslint-disable-next-line no-unused-vars
function modalMediaItemFactory(data) {
  const { title, image, video } = data;

  function getMediaItemDOM() {
    const media = document.createElement('div');
    media.className = 'slides';

    if (image) {
      const imgMedia = document.createElement('img');
      imgMedia.setAttribute('src', `assets/media/${image}`);
      imgMedia.setAttribute('role', 'image');
      imgMedia.setAttribute('tabindex', '1');
      imgMedia.setAttribute('alt', `${title}`);
      media.appendChild(imgMedia);
    } else if (video) {
      const videoMedia = document.createElement('video');
      videoMedia.setAttribute('src', `assets/media/${video}`);
      videoMedia.setAttribute('role', 'video');
      videoMedia.setAttribute('tabindex', '1');
      videoMedia.setAttribute('autoplay', 'true');
      videoMedia.setAttribute('loop', 'true');
      media.appendChild(videoMedia);
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', 'assets/media/imageneutre.jpg');
    }

    const description = document.createElement('div');
    description.setAttribute('role', 'presentation');
    description.textContent = `${title}`;
    description.className = 'describe-modal';
    media.appendChild(description);
    return media;
  }

  return { getMediaItemDOM };
}
