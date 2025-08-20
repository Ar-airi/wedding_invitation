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

  const enterBtn = document.getElementById("enterBtn");
  const entryScreen = document.getElementById("entry-screen");
  const leftDoor = document.querySelector(".left-door");
  const rightDoor = document.querySelector(".right-door");
  const bgm = document.getElementById("bgm");

  enterBtn.addEventListener("click", () => {
  bgm.volume = 0.5;
  bgm.play().catch(e => console.warn("Autoplay failed:", e));

  leftDoor.style.transform = "translateX(-100%)";
  rightDoor.style.transform = "translateX(100%)";

  setTimeout(() => {
    enterBtn.style.display = "none"; // 👈 now it disappears AFTER doors finish
    entryScreen.style.display = "none";
    document.body.style.overflow = "auto";

    // Auto-scroll through the whole page
    const scrollSpeed = 1; 
    const interval = setInterval(() => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        clearInterval(interval); // stop at bottom
      } else {
        window.scrollBy(0, scrollSpeed);
      }
    }, 10);

  }, 1600); // Wait for doors to finish
});



