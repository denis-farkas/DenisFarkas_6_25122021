function modalContactFactory(data) {
    const { name, id } = data;

    function getModalContactDOM(){
        const contactModal = document.querySelector(".contact_modal");
        const modal=document.createElement("div");
        modal.className="modal";
        const header=document.createElement("header");
        const h2=document.createElement("h2");
        h2.textContent=`Contactez-moi ${name}`;
        const img=document.createElement("img");
        img.setAttribute("src", "assets/icons/close.svg");
        img.setAttribute("onclick", "closeModal()");
        contactModal.appendChild(modal);
        modal.appendChild(header);
        header.appendChild(h2);
        header.appendChild(img);
        const form=document.createElement("form");
        form.setAttribute("onsubmit","event.preventDefault();closeModal();");
        modal.appendChild(form);

        const divFirst=document.createElement("div");
        const labelFirst=document.createElement("label");
        labelFirst.setAttribute("for", "first");
        labelFirst.textContent ="Prénom";
        const inpFirst=document.createElement("input");
        inpFirst.setAttribute("id", "first");
        inpFirst.setAttribute("type", "text");
        inpFirst.setAttribute("name", "firstname");
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
        form.appendChild(divMessage);
        divMessage.appendChild(labelMessage);
        divMessage.appendChild(inpMessage);

        const inpId=document.createElement("input");
        inpId.setAttribute("type", "hidden");
        inpId.setAttribute("value", `${id}`);
        form.appendChild(inpId);

        const sendButton=document.createElement("button");
        sendButton.setAttribute("onclick","closeModal();")
        sendButton.textContent="Envoyer";
        sendButton.className="contact-button";
        form.appendChild(sendButton);
        return contactModal;
    }
return {getModalContactDOM};
}