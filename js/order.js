function calcTotal() {
  let total = 0;
  getCart().forEach(item => {
    total += parsePrice(item.price) * item.qty;
  });
  return total;
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  const form = document.getElementById('cartForm');
  const empty = document.getElementById('cartEmpty');
  const totalEl = document.getElementById('cartTotal');

  container.innerHTML = '';

  if (cart.length === 0) {
    summary.style.display = 'none';
    form.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  summary.style.display = 'block';
  form.style.display = 'block';
  empty.style.display = 'none';

  let grandTotal = 0;

  cart.forEach(item => {
    const priceNum = parsePrice(item.price);
    const subtotal = priceNum * item.qty;
    grandTotal += subtotal;

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3 class="cart-item-title">${item.title}</h3>
        <span class="cart-item-price">${item.price}</span>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
      </div>
      <div class="cart-item-subtotal">${formatPrice(subtotal)}</div>
      <button class="cart-item-remove" data-id="${item.id}">&times;</button>
    `;

    el.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQty(Number(btn.dataset.id), Number(btn.dataset.delta));
        renderCart();
      });
    });

    el.querySelector('.cart-item-remove').addEventListener('click', () => {
      removeFromCart(Number(item.id));
      renderCart();
    });

    container.appendChild(el);
  });

  totalEl.textContent = formatPrice(grandTotal);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  document.getElementById('clearCartBtn').addEventListener('click', () => {
    clearCart();
    clearFormErrors();
    renderCart();
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (getCart().length === 0) return;
    if (!validateForm()) return;

    const total = calcTotal();
    const points = Math.floor(total / 10000);
    document.getElementById('pointsEarned').textContent = points;
    document.getElementById('checkoutModal').classList.add('is-open');

    clearCart();
    clearFormErrors();
    renderCart();
  });

  document.getElementById('closeCheckoutModal').addEventListener('click', () => {
    document.getElementById('checkoutModal').classList.remove('is-open');
  });
});
