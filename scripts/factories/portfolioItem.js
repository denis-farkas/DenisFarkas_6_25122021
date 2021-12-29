function portfolioItemFactory(data) {
    const { id, title, image, video, likes} = data;
    
    function getPortfolioCardDOM() {
      const article = document.createElement("article");
      if (image) {
        const img = document.createElement('img');
        img.setAttribute("src", `assets/media/${image}`);
        img.setAttribute("onclick", "displayMedia()")
        article.appendChild(img);
      } else if (video) {
        const vid = document.createElement('video');
        vid.setAttribute("src", `assets/media/${video}`);
        vid.setAttribute("autoplay","metadata");
        vid.setAttribute("onclick", "displayMedia()")
        article.appendChild(vid);
      }
      const row = document.createElement('div');
      row.className="row";
      article.appendChild(row);
      const span = document.createElement("span");
      span.textContent = `${title}`;
      span.className="describe";
      const like = document.createElement("div");
      like.className="likes";
      like.textContent = `${likes}`;
      const i = document.createElement("i");
      i.className="fa fa-heart";
      i.setAttribute("onclick", "incrementLikes()");
      row.appendChild(span);
      row.appendChild(like);
      like.appendChild(i);
      return article;
    }
    return { getPortfolioCardDOM };
    
  }