document.addEventListener("DOMContentLoaded", () => {
  const modalBackdrop = document.getElementById("productModal");
  if (modalBackdrop) {
    const closeModalBtn = document.getElementById("closeModal");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const orderNowLink = document.querySelector(".modal-actions a[href='order.html']");

    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const modalImage = document.getElementById("modalImage");

    let currentProduct = null;
    let addToCartTimer = null;

    function openModal(data) {
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDesc.textContent = data.desc;
      modalPrice.textContent = data.price;
      modalImage.src = data.img;
      modalImage.alt = data.title;

      currentProduct = {
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.img,
        alt: data.title,
      };

      clearTimeout(addToCartTimer);
      addToCartBtn.textContent = "Add to Cart";
      modalBackdrop.classList.add("is-open");
    }

    function closeModal() {
      modalBackdrop.classList.remove("is-open");
      currentProduct = null;
    }

    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-id");
        const product = products[index];
        openModal({
          id: product.id,
          title: product.title,
          subtitle: product.subtitle,
          desc: product.description,
          price: product.price,
          img: product.image,
        });
      });
    });

    addToCartBtn.addEventListener("click", () => {
      if (!currentProduct) return;
      addToCart(currentProduct);
      addToCartBtn.textContent = "✓ Added";
      clearTimeout(addToCartTimer);
      addToCartTimer = setTimeout(() => {
        addToCartBtn.textContent = "Add to Cart";
      }, 2000);
    });

    orderNowLink.addEventListener("click", (e) => {
      if (!currentProduct) return;
      e.preventDefault();
      addToCart(currentProduct);
      window.location.href = orderNowLink.href;
    });

    closeModalBtn.addEventListener("click", closeModal);

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      }
    });
  }
});
