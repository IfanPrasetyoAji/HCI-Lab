document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".products-grid");

  if (productGrid) {
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card blur";
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.alt}" class="product-image" />
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <h4 class="product-subtitle">${product.subtitle}</h4>
          <button class="shop-btn open-modal-btn"
            data-id=${product.id}>
            View Details
          </button>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }
});
