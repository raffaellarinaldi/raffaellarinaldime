const contactForm = document.getElementById("contact-form"), submitMessage = document.getElementById("contact-form-result");

const handleSubmit = (e) => {
  e.preventDefault();
  let formData = new FormData(contactForm);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
  .then(() => {
    submitMessage.innerHTML = `<div class="alert text-success alert-dismissible fade show" role="alert"><strong>Thanks!</strong> Your request has been sent. I'll get back to you shortly.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    contactForm.reset();
  })
  .catch((error) => {
    submitMessage.innerHTML = `<div class="alert text-danger alert-dismissible fade show" role="alert"><strong>Oh no!</strong> Your request could not be sent. Please try again later.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  });
};

contactForm.addEventListener("submit", handleSubmit);
