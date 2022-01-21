/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
function modalContactFactory(data) {
  const { name, id } = data;

  function getModalContactDOM(){
    const contactModal = document.querySelector(".contact_modal");
    const modal=document.createElement("div");
    modal.className="modal";
    modal.setAttribute("role", "article");
    modal.setAttribute("aria-label", "formulaire contactez moi");
    const header=document.createElement("header");
    const h2=document.createElement("h2");
    h2.textContent=`Contactez-moi ${name}`;
    h2.setAttribute("role", "heading");
    const img=document.createElement("img");
    img.setAttribute("src", "assets/icons/close.svg");
    img.setAttribute("onclick", "closeContactModal()");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "fermer le formulaire de contact avec la touche escape");
    img.className="closer";
    contactModal.appendChild(modal);
    modal.appendChild(header);
    header.appendChild(h2);
    header.appendChild(img);
    const form=document.createElement("form");
    form.setAttribute("onsubmit"," event.preventDefault(); printInputValues();  closeModal();");
    form.setAttribute("role", "form");
    modal.appendChild(form);
    const divFirst=document.createElement("div");
    const labelFirst=document.createElement("label");
    labelFirst.setAttribute("for", "first");
    labelFirst.textContent ="Prénom";
    const inpFirst=document.createElement("input");
    inpFirst.setAttribute("id", "first");
    inpFirst.setAttribute("type", "text");
    inpFirst.setAttribute("name", "firstname");
    inpFirst.required = true;
    form.appendChild(divFirst);
    divFirst.appendChild(labelFirst);
    divFirst.appendChild(inpFirst);

    const divLast=document.createElement("div");
    const labelLast=document.createElement("label");
    labelLast.setAttribute("for", "last");
    labelLast.textContent ="Nom";
    const inpLast=document.createElement("input");
    inpLast.setAttribute("id", "last");
    inpLast.setAttribute("type", "text");
    inpLast.setAttribute("name", "lastname");
    inpLast.required = true;
    form.appendChild(divLast);
    divLast.appendChild(labelLast);
    divLast.appendChild(inpLast);

    const divEmail=document.createElement("div");
    const labelEmail=document.createElement("label");
    labelEmail.setAttribute("for", "email");
    labelEmail.textContent="Email";
    const inpEmail=document.createElement("input");
    inpEmail.setAttribute("id", "email");
    inpEmail.setAttribute("type", "email");
    inpEmail.setAttribute("name", "email");
    inpEmail.required = true;
    form.appendChild(divEmail);
    divEmail.appendChild(labelEmail);
    divEmail.appendChild(inpEmail);

    const divMessage=document.createElement("div");
    const labelMessage=document.createElement("label");
    labelMessage.setAttribute("for", "message");
    labelMessage.textContent="Votre Message";
    const inpMessage=document.createElement("textarea");
    inpMessage.setAttribute("id", "message");
    inpMessage.setAttribute("name", "message");
    inpMessage.required = true;
    form.appendChild(divMessage);
    divMessage.appendChild(labelMessage);
    divMessage.appendChild(inpMessage);

    const inpId=document.createElement("input");
    inpId.setAttribute("type", "hidden");
    inpId.setAttribute("value", `${id}`);
    form.appendChild(inpId);

    const sendButton=document.createElement("button");
    sendButton.textContent="Envoyer";
    sendButton.className="submit-button";
    sendButton.setAttribute("role", "button");
    form.appendChild(sendButton);
    return contactModal;
  }
  return {getModalContactDOM};
}