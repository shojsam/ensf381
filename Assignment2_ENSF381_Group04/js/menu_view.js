// menu_view.js
// Dynamic cart management for Seasonal Specials

(function () {
  const cart = new Map(); // name -> { qty, price }

  const cartItemsEl = document.getElementById('cart_items');
  const emptyEl = document.getElementById('cart_empty');

  function formatMoney(amount) {
    return `$${amount.toFixed(2)}`;
  }

  function renderCart() {
    if (!cartItemsEl || !emptyEl) return;

    cartItemsEl.innerHTML = '';

    if (cart.size === 0) {
      emptyEl.style.display = 'block';
      return;
    }

    emptyEl.style.display = 'none';

    for (const [name, item] of cart.entries()) {
      const row = document.createElement('div');
      row.className = 'cart_row';

      const left = document.createElement('div');
      left.className = 'cart_left';
      left.textContent = `${name} (${item.qty})`;

      const right = document.createElement('div');
      right.className = 'cart_right';
      right.textContent = formatMoney(item.qty * item.price);

      row.appendChild(left);
      row.appendChild(right);
      cartItemsEl.appendChild(row);
    }
  }

  function getItemDataFromTile(tile) {
    const nameEl = tile.querySelector('h3');
    const priceEl = tile.querySelector('[data-price]');
    let price = 0;

    if (priceEl) {
      price = parseFloat(priceEl.getAttribute('data-price')) || 0;
    } else {
      // Fallback: parse $X.XX from text
      const text = tile.textContent || '';
      const m = text.match(/\$\s*(\d+(?:\.\d{1,2})?)/);
      if (m) price = parseFloat(m[1]);
    }

    return { name: nameEl ? nameEl.textContent.trim() : 'Item', price };
  }

  function addItem(tile) {
    const { name, price } = getItemDataFromTile(tile);
    if (!price) return;

    const prev = cart.get(name);
    if (prev) {
      prev.qty += 1;
    } else {
      cart.set(name, { qty: 1, price });
    }
    renderCart();
  }

  function removeItem(tile) {
    const { name } = getItemDataFromTile(tile);
    if (!cart.has(name)) return;

    const item = cart.get(name);
    item.qty -= 1;
    if (item.qty <= 0) cart.delete(name);

    renderCart();
  }

  // Hook up buttons inside seasonal specials tiles
  document.querySelectorAll('.ice_cream_tile').forEach((tile) => {
    const addBtn = tile.querySelector('.add_btn');
    const removeBtn = tile.querySelector('.remove_btn');
    const customizeLink = tile.querySelector('.customize_link');

    if (addBtn) addBtn.addEventListener('click', () => addItem(tile));
    if (removeBtn) removeBtn.addEventListener('click', () => removeItem(tile));
    if (customizeLink) {
      customizeLink.addEventListener('click', () => {
        const { name } = getItemDataFromTile(tile);
        try {
          sessionStorage.setItem('order_flavor', name);
        } catch (_) {}
      });
    }
  });

  renderCart();
})();
