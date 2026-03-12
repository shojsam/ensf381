// order_summary.js
(function () {
  const flavorEl = document.getElementById('summary_flavor');
  const typeEl = document.getElementById('summary_type');
  const toppingsEl = document.getElementById('summary_toppings');
  const priceEl = document.getElementById('summary_price');

  function readToppings() {
    try {
      return JSON.parse(sessionStorage.getItem('order_toppings') || '[]');
    } catch (_) {
      return [];
    }
  }

  const flavor = sessionStorage.getItem('order_flavor') || 'Vanilla Dream';
  const type = sessionStorage.getItem('order_type') || 'Not selected';
  const toppings = readToppings();
  const price = parseFloat(sessionStorage.getItem('order_price') || '0');

  if (flavorEl) flavorEl.textContent = flavor;
  if (typeEl) typeEl.textContent = type;
  if (toppingsEl) toppingsEl.textContent = toppings.length ? toppings.join(', ') : 'None selected';
  if (priceEl) priceEl.textContent = `$${price.toFixed(2)}`;
})();
