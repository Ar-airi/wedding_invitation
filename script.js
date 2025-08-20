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

// Set viewport height for mobile
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('load', setVH);
window.addEventListener('resize', setVH);

// Entry screen animation
const enterBtn = document.getElementById("enter-btn");
const entryScreen = document.getElementById("entry-screen");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");
const bgm = document.getElementById("bgm");

document.body.style.overflow = "hidden";

enterBtn.addEventListener("click", () => {
    enterBtn.style.display = "none";
    bgm.volume = 0.5;
    bgm.play().catch(e => console.warn("Autoplay failed:", e));

    // Open doors
    leftDoor.style.transform = "translateX(-100%)";
    rightDoor.style.transform = "translateX(100%)";

    // After doors open, hide screen and start smooth scroll
    setTimeout(() => {
        entryScreen.style.display = "none";
        document.body.style.overflow = "auto";

        const targetY = document.body.scrollHeight - window.innerHeight; // scroll to bottom
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 10000; // 10s scroll duration
        let startTime = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;
        }

        function smoothScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuad(progress);
            window.scrollTo(0, startY + distance * eased);
            if (progress < 1) requestAnimationFrame(smoothScroll);
        }

        requestAnimationFrame(smoothScroll);

    }, 1600); // wait for doors animation
});

// RSVP Form Handling
const form = document.getElementById('rsvp-form');
const customRadio = document.getElementById("customRadio");
const customNumber = document.getElementById("customNumber");
const radios = document.querySelectorAll("input[name='Kehadiran']");
const responseDiv = document.getElementById('rsvp-response');

// Enable/disable custom number input & auto-select radio
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (customRadio.checked) {
            customNumber.disabled = false;
            customNumber.focus();
        } else {
            customNumber.disabled = true;
            customNumber.value = ""; 
        }
    });
});

// Auto-select radio when clicking number input
customNumber.addEventListener("focus", () => {
    customRadio.checked = true;
    customNumber.disabled = false;
});

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    if (customRadio.checked) {
        const numValue = customNumber.value;
        if (!numValue || numValue < 1) {
            responseDiv.innerHTML = '<p style="color:#cc0000;">Sila masukkan bilangan tetamu</p>';
            responseDiv.style.display = 'block';
            customNumber.focus();
            return;
        }
        formData.set("Jumlah_Tetamu", numValue);
    } else {
        formData.delete("Jumlah_Tetamu");
    }

    responseDiv.innerHTML = '<p style="color:#7f4f24;">Menghantar maklumat anda...</p>';
    responseDiv.style.display = 'block';

    fetch(form.action, { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
            if (data.status === "error") {
                responseDiv.innerHTML = `<p style="color:#cc0000;">${data.message}</p>`;
            } else {
                responseDiv.innerHTML = `<p style="color:#7f4f24;">${data.message}</p>`;
                form.reset();
                customNumber.disabled = true;
            }
        })
        .catch(error => {
            responseDiv.innerHTML = '<p style="color:#cc0000;">Oops! Something went wrong. Please try again.</p>';
            console.error('Error:', error);
        });
});
