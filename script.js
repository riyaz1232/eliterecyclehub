const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const reviewCards = document.querySelectorAll('.review-card');
let activeReview = 0;

function setFormStatus(message, type = 'success') {
  formStatus.textContent = message;
  formStatus.classList.remove('success', 'error');
  formStatus.classList.add(type);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?\d{10,15}$/.test(phone.replace(/\s+/g, ''));
}

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  navToggle.classList.toggle('open');
});

window.addEventListener('click', (event) => {
  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove('show');
    navToggle.classList.remove('open');
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const phone = contactForm.phone.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !phone) {
    setFormStatus('Please complete the required fields: name, email and phone.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    setFormStatus('Please enter a valid email address.', 'error');
    return;
  }

  if (!isValidPhone(phone)) {
    setFormStatus('Please enter a valid phone number with country code.', 'error');
    return;
  }

  const subject = encodeURIComponent(`Elite Recycle Hub inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || 'No additional details provided.'}`);
  const mailtoLink = `mailto:elite.recycle.hub@gmail.com?subject=${subject}&body=${body}`;

  setFormStatus('Your request is ready to send. Please complete the email in your mail app or contact us directly on WhatsApp if you prefer.', 'success');
  window.open(mailtoLink, '_blank');
  contactForm.reset();
});

function rotateReviews() {
  reviewCards.forEach((card, index) => {
    card.classList.toggle('active', index === activeReview);
  });
  activeReview = (activeReview + 1) % reviewCards.length;
}

setInterval(rotateReviews, 5000);


