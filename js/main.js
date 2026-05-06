document.addEventListener("DOMContentLoaded", () => {
  const modalBackdrop = document.getElementById("productModal");
  if (modalBackdrop) {
    const closeModalBtn = document.getElementById("closeModal");
    const moreDetailsBtns = document.querySelectorAll(".more-details-btn");

    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const modalImage = document.getElementById("modalImage");

    function openModal(data) {
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDesc.textContent = data.desc;
      modalPrice.textContent = data.price;
      modalImage.src = data.img;
      modalImage.alt = data.title;

      modalBackdrop.classList.add("is-open");
    }

    function closeModal() {
      modalBackdrop.classList.remove("is-open");
    }

    moreDetailsBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const data = {
          title: btn.getAttribute("data-title"),
          subtitle: btn.getAttribute("data-subtitle"),
          desc: btn.getAttribute("data-desc"),
          price: btn.getAttribute("data-price"),
          img: btn.getAttribute("data-img"),
        };
        openModal(data);
      });
    });

    closeModalBtn.addEventListener("click", closeModal);

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    // Escape key to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      }
    });
  }
});
