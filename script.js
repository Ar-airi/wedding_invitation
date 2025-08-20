const form = document.getElementById('rsvp-form');
const responseDiv = document.getElementById('rsvp-response');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.disabled = true;
  responseDiv.innerText = "Sending your response...";

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(() => {
    responseDiv.innerText = "Thank you! Your Response has been received.";
    form.reset();
  })
  .catch(() => {
    responseDiv.innerText = "Please try again later.";
  })
  .finally(() => {
    submitBtn.disabled = false;
  });
});

