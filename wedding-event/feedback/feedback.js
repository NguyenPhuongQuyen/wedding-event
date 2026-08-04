const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function getSlideWidth() {
    const card = document.querySelector('.testimonial-card');
    const gap = 30; 
    return card.offsetWidth + gap;
}

function updateCarousel() {
    const slideWidth = getSlideWidth();
    const maxIndex = track.children.length - Math.floor(window.innerWidth / slideWidth);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex && maxIndex > 0) currentIndex = maxIndex;

    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    const slideWidth = getSlideWidth();
    const maxIndex = track.children.length - Math.floor(window.innerWidth / slideWidth);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);


const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('guestName').value;
    const role = document.getElementById('guestRole').value;
    const comment = document.getElementById('guestComment').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    let starString = '';
    for (let i = 0; i < 5; i++) {
        starString += (i < rating) ? '★' : '☆';
    }

    const newCard = document.createElement('div');
    newCard.classList.add('testimonial-card');

    const randomId = Math.floor(Math.random() * 500);

    newCard.innerHTML = `
         <div>
             <div class="company-logo-placeholder">The Smith Wedding</div>
             <p class="testimonial-text">"${comment}"</p>
         </div>
         <div>
             <div class="stars">${starString}</div>
             <div class="profile-container">
                 <img src="https://picsum.photos/id/${randomId}/100/100" alt="${name}" class="profile-pic">
                 <div class="profile-info">
                     <h4>${name}</h4>
                     <p>${role}</p>
                 </div>
             </div>
         </div>
     `;

    track.insertBefore(newCard, track.firstChild);

    currentIndex = 0;
    updateCarousel();

    feedbackForm.reset();
    alert("Thank you for sharing your feedback and blessings!");
});