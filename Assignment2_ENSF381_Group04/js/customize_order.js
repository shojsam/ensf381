// customize_order.js
(function () {
  const TIMER_SECONDS = 10 * 60;

  const timerEl = document.getElementById('order_timer');
  const formEl = document.getElementById('customize_form');
  const priceEl = document.getElementById('total_price_value');
  const messageEl = document.getElementById('customize_message');
  const submitTypeBtn = document.getElementById('submit_type_btn');
  const submitToppingsBtn = document.getElementById('submit_toppings_btn');
  const flavorEl = document.getElementById('customize_flavor');
  const selectedFlavor = sessionStorage.getItem('order_flavor') || 'Vanilla Dream';

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  let remaining = TIMER_SECONDS;

  function tick() {
    if (!timerEl) return;
    timerEl.textContent = formatTime(remaining);

    remaining -= 1;
    if (remaining < 0) {
      window.location.href = 'order_summary.html';
    }
  }

  // Start immediately
  tick();
  setInterval(tick, 1000);

  function getSelectedRadio(name) {
    return document.querySelector(`input[name="${name}"]:checked`);
  }

  function getCheckedCheckboxes(selector) {
    return Array.from(document.querySelectorAll(selector)).filter((el) => el.checked);
  }

  function calculatePrice(numToppings) {
    return 6 + (numToppings * 1.5);
  }

  function showMessage(text, type) {
    if (!messageEl) return;
    messageEl.hidden = false;
    messageEl.textContent = text;
    messageEl.className = `dynamic_message ${type}`;
  }

  function updateDisplayedPrice() {
    const toppings = getCheckedCheckboxes('input[type="checkbox"][name^="topping"]');
    const total = calculatePrice(toppings.length);

    if (priceEl) {
      priceEl.textContent = `$${total.toFixed(2)}`;
    }

    return total;
  }

  function saveOrderSummary(flavorValue, typeValue, toppingsValues, price) {
    try {
      sessionStorage.setItem('order_flavor', flavorValue || 'Vanilla Dream');
      sessionStorage.setItem('order_type', typeValue || '');
      sessionStorage.setItem('order_toppings', JSON.stringify(toppingsValues || []));
      sessionStorage.setItem('order_price', String(price));
    } catch (_) {}
  }

  if (flavorEl) {
    flavorEl.textContent = selectedFlavor;
  }

  if (submitTypeBtn) {
    submitTypeBtn.addEventListener('click', () => {
      const typeSelected = getSelectedRadio('type');

      if (!typeSelected) {
        showMessage('Please select Cup or Cone first.', 'error');
        return;
      }

      const toppings = getCheckedCheckboxes('input[type="checkbox"][name^="topping"]');
      const total = updateDisplayedPrice();
      saveOrderSummary(selectedFlavor, typeSelected.value, toppings.map((t) => t.value), total);
      showMessage(`Type saved: ${typeSelected.value}.`, 'success');
    });
  }

  if (submitToppingsBtn) {
    submitToppingsBtn.addEventListener('click', () => {
      const typeSelected = getSelectedRadio('type');
      const toppings = getCheckedCheckboxes('input[type="checkbox"][name^="topping"]');

      if (toppings.length === 0) {
        showMessage('Please select at least one topping first.', 'error');
        return;
      }

      const total = updateDisplayedPrice();
      saveOrderSummary(selectedFlavor, typeSelected ? typeSelected.value : '', toppings.map((t) => t.value), total);
      showMessage(`Toppings saved. Total is now $${total.toFixed(2)}.`, 'success');
    });
  }

  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      const typeSelected = getSelectedRadio('type');
      const toppings = getCheckedCheckboxes('input[type="checkbox"][name^="topping"]');

      if (!typeSelected) {
        e.preventDefault();
        alert('Please select one base flavor (Cup or Cone).');
        return;
      }

      if (toppings.length === 0) {
        e.preventDefault();
        alert('Please select at least one topping.');
        return;
      }

      const total = calculatePrice(toppings.length);
      updateDisplayedPrice();

      saveOrderSummary(selectedFlavor, typeSelected.value, toppings.map(t => t.value), total);
      
    });
  }
})();
