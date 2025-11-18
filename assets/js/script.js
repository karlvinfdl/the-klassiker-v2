document.addEventListener("DOMContentLoaded", () => {
  // ============ MENU BURGER (simplifié) ============
  const burgerBtn = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!mainNav || !burgerBtn) return;
    mainNav.classList.remove("is-open");
    burgerBtn.classList.remove("burger-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = !mainNav.classList.contains("is-open");

      mainNav.classList.toggle("is-open", isOpen);
      burgerBtn.classList.toggle("burger-open", isOpen);
      burgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("no-scroll", isOpen);
    });

    // Fermer le menu quand on clique sur un lien (mobile)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });
  }

  // 👇 laisse tout le reste de ton script.js tel quel
  // (setActiveLink, Voir tout le menu, Galerie, Lightbox, Animations scroll, etc.)


  // ============ ACTIF NAV (simple) ============
  const setActiveLink = () => {
    const path = window.location.pathname;
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Pour tes pages /pages/contact.html et /pages/recrutement.html
      if (path.endsWith("contact.html") && href.includes("contact.html")) {
        link.classList.add("active");
      } else if (path.endsWith("recrutement.html") && href.includes("recrutement.html")) {
        link.classList.add("active");
      }
    });
  };
  setActiveLink();

  // ============ VOIR TOUT LE MENU ============ 
  const toggleCarteBtn = document.getElementById("toggleCarte");
  const hiddenCards = document.querySelectorAll(".food-card-hidden");
  let carteExpanded = false;

  if (toggleCarteBtn && hiddenCards.length > 0) {
    hiddenCards.forEach((card) => (card.style.display = "none"));

    toggleCarteBtn.addEventListener("click", () => {
      carteExpanded = !carteExpanded;
      hiddenCards.forEach((card) => {
        card.style.display = carteExpanded ? "block" : "none";
      });
      toggleCarteBtn.textContent = carteExpanded ? "Réduire" : "Voir tout le menu";
    });
  }

  // ============ GALERIE (thumbs + flèches + lightbox) ============
  const galleryMain = document.getElementById("galleryMain");
  const thumbs = document.querySelectorAll(".gallery-thumb");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  // Lightbox
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("galleryLightboxClose");
  const lightboxBackdrop = document.getElementById("galleryLightboxBackdrop");

  // liste complète des images
  const galleryImages = [
    "assets/images/galerie-1.jpg",
    "assets/images/galerie-25.jpg",
    "assets/images/galerie-3.jpg",
    "assets/images/galerie-4.jpg",
    "assets/images/galerie-5.jpg",
    "assets/images/galerie-6.jpg",
    "assets/images/galerie-7.jpg",
    "assets/images/galerie-8.jpg",
    "assets/images/galerie-9.jpg",
    "assets/images/galerie-10.jpg",
    "assets/images/galerie-11.jpg",
    "assets/images/galerie-12.jpg",
    "assets/images/galerie-13.jpg",
    "assets/images/galerie-14.jpg",
    "assets/images/galerie-15.jpg",
    "assets/images/galerie-16.jpg",
    "assets/images/galerie-17.jpg",
    "assets/images/galerie-18.jpg",
  ];

  let currentIndex = 0;
  const SLIDE_DELAY = 5000;
  let autoSlideInterval;

  function setActiveThumb(index) {
    thumbs.forEach((t) => t.classList.remove("is-active"));
    const active = document.querySelector(`.gallery-thumb[data-index="${index}"]`);
    if (active) active.classList.add("is-active");
  }

  function showImage(index) {
    if (!galleryMain || galleryImages.length === 0) return;

    currentIndex = (index + galleryImages.length) % galleryImages.length;

    galleryMain.classList.add("is-fading");

    setTimeout(() => {
      galleryMain.src = galleryImages[currentIndex];
      setActiveThumb(currentIndex);
    }, 250);

    setTimeout(() => {
      galleryMain.classList.remove("is-fading");
    }, 500);
  }

  function nextImage() {
    showImage(currentIndex + 1);
  }

  function prevImage() {
    showImage(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextImage, SLIDE_DELAY);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  // Lightbox helpers
  function openLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightboxGallery() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    lightbox.setAttribute("aria-hidden", "true");
  }

  if (galleryMain) {
    // thumbs clic
    thumbs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.index, 10);
        if (Number.isNaN(idx)) return;
        showImage(idx);
        startAutoSlide();
      });
    });

    // flèches
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevImage();
        startAutoSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextImage();
        startAutoSlide();
      });
    }

    // clic sur l'image principale => ouvre en grand
    galleryMain.addEventListener("click", openLightbox);

    // lightbox : fermer (croix + fond + ESC)
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightboxGallery);
    }
    if (lightboxBackdrop) {
      lightboxBackdrop.addEventListener("click", closeLightboxGallery);
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeLightboxGallery();
      }
    });

    // lancement auto
    showImage(0);
    startAutoSlide();
  }

  // ============ ANIMATIONS AU SCROLL ============ 
  const animated = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animated.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("is-visible"));
  }
});
