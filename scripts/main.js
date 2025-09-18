const elements = {
  form: document.querySelector('.events__form'),
  eventsPopup: document.getElementById('eventsPopup'),
  eventsSubmit: document.getElementById('eventsSubmit'),
  eventsPopupClose: document.getElementById('eventsPopupClose'),
  eventsTable: document.getElementById('eventsTable'),
  eventsTableClose: document.getElementById('eventsTableClose'),
  heroBtn: document.getElementById('heroBtn'),
  contactsForm: document.querySelector('.contacts__form'),
  contactsSuccess: document.getElementById('contactsAccess')
};

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputs = elements.form.querySelectorAll('input');
  let isValid = true;

  inputs.forEach(input => {
    input.classList.toggle('invalid', !input.checkValidity());
    isValid = isValid && input.checkValidity();
  });

  if (isValid) {
    elements.form.style.display = 'none';
    elements.eventsSubmit.style.display = 'none';

    const successMessage = document.createElement('p');
    Object.assign(successMessage, {
      textContent: 'Вітаємо! Квиток успішно придбано!',
      className: 'success-message',
      style: { color: 'lightgreen', marginTop: '20px' }
    });
    elements.form.parentNode.appendChild(successMessage);

    elements.eventsPopup.style.display = 'block';
  }
});

const resetFormAndPopup = () => {
  const successMsg = elements.form.parentNode.querySelector('.success-message');
  if (successMsg) successMsg.remove();

  Object.assign(elements.form.style, { display: '' });
  Object.assign(elements.eventsSubmit.style, { display: '' });
  elements.form.reset();
  elements.form.querySelectorAll('.invalid').forEach(input => input.classList.remove('invalid'));
};

const buyTicket = () => {
  resetFormAndPopup();
  elements.eventsPopup.style.display = 'block';
  elements.eventsPopupClose.addEventListener('click', () => {
    elements.eventsPopup.style.display = 'none';
  }, { once: true });
};

document.querySelectorAll('.events__link').forEach(button => {
  button.addEventListener('click', buyTicket);
});

elements.heroBtn.addEventListener('click', () => {
  Object.assign(elements.eventsTable.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '1170px',
    zIndex: '1000',
    overflowY: 'auto'
  });
  elements.eventsTableClose.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.classList.add('dark-bg');

  elements.eventsTableClose.addEventListener('click', () => {
    Object.assign(elements.eventsTable.style, {
      position: '',
      top: '',
      left: '',
      transform: '',
      width: '',
      maxWidth: '',
      zIndex: '',
      overflowY: ''
    });
    elements.eventsTableClose.style.display = 'none';
    document.body.style.overflow = '';
    document.body.classList.remove('dark-bg');
    elements.eventsPopup.style.display = 'none';
  }, { once: true });
});

elements.contactsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = {
    name: elements.contactsForm.querySelector('input[type="text"]'),
    email: elements.contactsForm.querySelector('input[type="email"]'),
    message: elements.contactsForm.querySelector('textarea')
  };

  if (Object.values(inputs).every(input => input.value.trim())) {
    console.log('Form Data:', {
      name: inputs.name.value.trim(),
      email: inputs.email.value.trim(),
      message: inputs.message.value.trim()
    });

    elements.contactsForm.querySelectorAll('.contacts__form-label').forEach(label => {
      label.style.display = 'none';
    });
    elements.contactsForm.querySelector('.contacts__submit').style.display = 'none';
    elements.contactsSuccess.style.display = 'block';

    setTimeout(() => {
      Object.values(inputs).forEach(input => input.value = '');
      elements.contactsForm.querySelectorAll('.contacts__form-label').forEach(label => {
        label.style.display = 'flex';
      });
      elements.contactsForm.querySelector('.contacts__submit').style.display = 'block';
      elements.contactsSuccess.style.display = 'none';
    }, 2000);
  }
});