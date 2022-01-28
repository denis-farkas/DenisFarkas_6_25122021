// eslint-disable-next-line no-unused-vars
function modalContactFactory(data) {
  const { name, id } = data;

  function getModalContactDOM() {
    const contactModal = document.querySelector('.contact_modal');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'article');
    modal.setAttribute('aria-label', 'formulaire contactez moi');

    const header = document.createElement('header');

    const h2 = document.createElement('h2');
    h2.textContent = `Contactez-moi ${name}`;
    h2.setAttribute('role', 'heading');

    const img = document.createElement('img');
    img.setAttribute('src', 'assets/icons/close.svg');
    img.setAttribute('onclick', 'closeContactModal()');
    img.setAttribute(
      'aria-label',
      'fermer le formulaire de contact avec la touche escape'
    );
    img.className = 'closer';
    contactModal.appendChild(modal);
    modal.appendChild(header);
    header.appendChild(h2);
    header.appendChild(img);

    const form = document.createElement('form');
    form.setAttribute(
      'onsubmit',
      ' event.preventDefault(); printInputValues();  closeContactModal();'
    );
    modal.appendChild(form);

    const firstElement = document.createElement('div');

    const labelFirst = document.createElement('label');
    labelFirst.setAttribute('for', 'first');
    labelFirst.textContent = 'Prénom';

    const inputFirst = document.createElement('input');
    inputFirst.setAttribute('id', 'first');
    inputFirst.setAttribute('type', 'text');
    inputFirst.setAttribute('name', 'firstname');
    inputFirst.required = true;

    form.appendChild(firstElement);
    firstElement.appendChild(labelFirst);
    firstElement.appendChild(inputFirst);

    const lastElement = document.createElement('div');

    const labelLast = document.createElement('label');
    labelLast.setAttribute('for', 'last');
    labelLast.textContent = 'Nom';

    const inputLast = document.createElement('input');
    inputLast.setAttribute('id', 'last');
    inputLast.setAttribute('type', 'text');
    inputLast.setAttribute('name', 'lastname');
    inputLast.required = true;

    form.appendChild(lastElement);
    lastElement.appendChild(labelLast);
    lastElement.appendChild(inputLast);

    const emailElement = document.createElement('div');

    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.textContent = 'Email';

    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('id', 'email');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('name', 'email');
    inputEmail.required = true;

    form.appendChild(emailElement);
    emailElement.appendChild(labelEmail);
    emailElement.appendChild(inputEmail);

    const messageElement = document.createElement('div');

    const labelMessage = document.createElement('label');
    labelMessage.setAttribute('for', 'message');
    labelMessage.textContent = 'Votre Message';

    const inputMessage = document.createElement('textarea');
    inputMessage.setAttribute('id', 'message');
    inputMessage.setAttribute('name', 'message');
    inputMessage.required = true;

    form.appendChild(messageElement);
    messageElement.appendChild(labelMessage);
    messageElement.appendChild(inputMessage);

    const inputId = document.createElement('input');
    inputId.setAttribute('type', 'hidden');
    inputId.setAttribute('value', `${id}`);
    form.appendChild(inputId);

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Envoyer';
    sendButton.className = 'submit-button';
    sendButton.setAttribute('role', 'button');
    form.appendChild(sendButton);
    return contactModal;
  }
  return { getModalContactDOM };
}
