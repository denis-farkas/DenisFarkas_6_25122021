
function headerFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const main = document.querySelector("main");
    const picture = `assets/photographers/${portrait}`;
    function getUserHeaderDOM() {
      const header =document.createElement("div");
      header.className="photograph_header";
      main.appendChild(header);
      const headerLeft = document.createElement("div");
      headerLeft.className = "photograph_header_left";
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
    function getUserBodyDOM() {
        const body =document.createElement("div");
        body.className="photograph_body";
        main.appendChild(body);
        return body;
    }
    function getPortfolioSectionDOM(){
      const section = document.createElement("section");
      section.className="portfolio_section";
      const portfolio_header = document.createElement("div");
      portfolio_header.className="portfolio_header";
      main.appendChild(section);
      section.appendChild(portfolio_header);
      const portfolio_header_menu = document.createElement("div");
      portfolio_header_menu.className="menu";
      portfolio_header.appendChild(portfolio_header_menu);
      const portfolio_body = document.createElement("div");
      portfolio_body.className="portfolio_body";
      section.appendChild(portfolio_body)
      return section;
    }
    return{getUserHeaderDOM, getUserBodyDOM, getPortfolioSectionDOM};
  
  }