function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

function setCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  setCart(cart);
}

function removeFromCart(id) {
  setCart(getCart().filter(item => item.id !== id));
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    setCart(cart);
  }
}

function clearCart() {
  setCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function parsePrice(str) {
  return parseInt(str.replace(/[^0-9]/g, ''), 10);
}

function formatPrice(num) {
  return 'Rp' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
