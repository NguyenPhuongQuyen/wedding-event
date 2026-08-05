// Bật tắt menu mobile
const menuToggle = document.getElementById('menu-toggle');
const navMobile = document.getElementById('nav-menu-mobile');
menuToggle.addEventListener('click', function () {
  navMobile.classList.toggle('hidden');
  navMobile.classList.toggle('flex');
  menuToggle.setAttribute('aria-expanded', !navMobile.classList.contains('hidden'));
});

// Cuộn mượt khi click vào liên kết
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Bật/tắt dropdown "SPACES & HALLS" (dùng chung cho cả bản desktop và mobile)
document.querySelectorAll('.spaces-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const submenu = btn.nextElementSibling;
    const chevron = btn.querySelector('.spaces-chevron');
    const willOpen = submenu.classList.contains('hidden');
    submenu.classList.toggle('hidden');
    submenu.classList.toggle('flex');
    btn.setAttribute('aria-expanded', willOpen);
    if (chevron) chevron.classList.toggle('rotate-180');
  });
});

// Active menu theo section đang hiển thị (header)
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('header .nav-link');
if (sections.length > 0) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) { link.classList.remove('active'); });
        const match = document.querySelector('header .nav-link[href="#' + entry.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(function (s) { observer.observe(s); });
}

// Nút Back to top
document.getElementById('backToTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Script tự động chuyển Slider 3 giây/ảnh (Hero Banner)
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('#hero-slider .slide');
  // Kiểm tra xem có banner nào không trước khi thực hiện chuyển slide
  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 3000; // 3000ms = 3 giây

    function nextSlide() {
      // Ẩn slide hiện tại
      slides[currentSlide].classList.remove('opacity-100');
      slides[currentSlide].classList.add('opacity-0');

      // Chuyển sang slide tiếp theo
      currentSlide = (currentSlide + 1) % slides.length;

      // Hiện slide mới
      slides[currentSlide].classList.remove('opacity-0');
      slides[currentSlide].classList.add('opacity-100');
    }

    // Chạy lặp lại sau mỗi 3s
    setInterval(nextSlide, slideInterval);
  }
});