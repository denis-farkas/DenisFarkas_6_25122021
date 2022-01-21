/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
function modalMediaFactory() {
   
  function getModalMediaDOM() {
    const modal=document.createElement("div");
    modal.className="media_modal";
    modal.setAttribute("aria-modal","true");
    const content =document.createElement("div");
    content.className="row";
    modal.appendChild(content);
    const asideLeft=document.createElement("div");
    asideLeft.className="aside-left";
    content.appendChild(asideLeft);
    const imgLeft = document.createElement("img");
    imgLeft.setAttribute("src", "assets/icons/chevron-left-solid.svg");
    imgLeft.setAttribute("onclick", "plusSlides(-1)");
    imgLeft.className="img_aside";
    imgLeft.setAttribute("role", "button");
    imgLeft.setAttribute("aria-label", "image précédente");
    asideLeft.appendChild(imgLeft);
    const center = document.createElement("div");
    center.className="body_center";
    content.appendChild(center);
    const asideRight=document.createElement("div");
    asideRight.className="aside-right";
    content.appendChild(asideRight);
    const header=document.createElement("div");
    header.className="aside_header";
    asideRight.appendChild(header);
    const img=document.createElement("img");
    img.setAttribute("src", "assets/icons/close-black.svg");
    img.setAttribute("onclick", "closeLightBox()");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "fermer le slide avec la touche escape");
    img.className="closer";
    header.appendChild(img);
    const body=document.createElement("div");
    body.className="aside_body";
    asideRight.appendChild(body);
    const imgRight = document.createElement("img");
    imgRight.setAttribute("src", "assets/icons/chevron-right-solid.svg");
    imgRight.setAttribute("onclick", "plusSlides(1)");
    imgRight.className="img_aside";
    imgRight.setAttribute("role", "button");
    imgRight.setAttribute("aria-label", "image suivante");
    body.appendChild(imgRight);
      
    return modal;
  }
  return {getModalMediaDOM};
}