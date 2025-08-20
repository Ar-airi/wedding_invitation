const form = document.getElementById('rsvp-form');
const responseDiv = document.getElementById('rsvp-response');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.disabled = true;
  responseDiv.innerText = "Menghantar... Sila tunggu.";

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(() => {
    responseDiv.innerText = "Terima kasih atas jawapan anda!";
    form.reset();
  })
  .catch(() => {
    responseDiv.innerText = "Ralat berlaku. Sila cuba lagi.";
  })
  .finally(() => {
    submitBtn.disabled = false;
  });
});
