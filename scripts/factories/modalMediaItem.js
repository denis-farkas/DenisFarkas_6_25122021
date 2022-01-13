function modalMediaItemFactory(data) {
    const { title, image, video} = data;

    function getMediaItemDOM() {
        const media =document.createElement("div");
        media.className="slides";
        
        if (image) {
            const imgMedia = document.createElement('img');
            imgMedia.setAttribute("src", `assets/media/${image}`);
            media.appendChild(imgMedia);
          } else if (video) {
            const vidMedia = document.createElement('video');
            vidMedia.setAttribute("src", `assets/media/${video}`);
            vidMedia.setAttribute("autoplay","autoplay");
            vidMedia.setAttribute("loop","true"); 
            media.appendChild(vidMedia);
          }

        const description = document.createElement("div");
        description.textContent = `${title}`;
        description.className="describe-modal";
        media.appendChild(description);
        return media;
    }
    
    return {getMediaItemDOM};
    
  }