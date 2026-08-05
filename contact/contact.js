document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    const subscribeForm = document.getElementById('subscribeForm');
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    const weddingDateInput = document.getElementById('weddingDate');
    if (weddingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        weddingDateInput.min = today;
    }


    const showToast = (message) => {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const markInvalid = (element) => element.parentElement?.classList.add('invalid');
    const clearInvalid = (element) => element.parentElement?.classList.remove('invalid');


    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const fields = {
            fullName: document.getElementById('fullName'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            weddingDate: document.getElementById('weddingDate'),
            guestCount: document.getElementById('guestCount')
        };

        if (!fields.fullName.value.trim()) { markInvalid(fields.fullName); isValid = false; }
        if (!validateEmail(fields.email.value.trim())) { markInvalid(fields.email); isValid = false; }
        if (!fields.phone.value.trim()) { markInvalid(fields.phone); isValid = false; }
        if (!fields.weddingDate.value) { markInvalid(fields.weddingDate); isValid = false; }
        if (!fields.guestCount.value) { markInvalid(fields.guestCount); isValid = false; }

        if (isValid) {
            console.log('Form data captured successfully:', {
                name: fields.fullName.value,
                email: fields.email.value,
                date: fields.weddingDate.value,
                arrangement: document.getElementById('seatingStyle').value
            });
            showToast("✨ Reservation Request Received! Check your email soon.");
            reservationForm.reset();
        }
    });

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subEmailInput = document.getElementById('subEmail');
        const errorMsg = document.getElementById('subError');

        if (!validateEmail(subEmailInput.value.trim())) {
            errorMsg.style.display = 'block';
            subEmailInput.style.borderColor = '#b33939';
        } else {
            errorMsg.style.display = 'none';
            subEmailInput.style.borderColor = '';
            showToast("💌 Thank you for subscribing to our wedding updates!");
            subscribeForm.reset();
        }
    });

    reservationForm.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => clearInvalid(input));
        input.addEventListener('change', () => clearInvalid(input));
    });
    
    document.getElementById('subEmail').addEventListener('input', function() {
        this.style.borderColor = '';
        document.getElementById('subError').style.display = 'none';
    });
});