// login.js
(async function () {
  const form = document.getElementById('login_form');
  const msgBox = document.getElementById('login_message');

  function showMessage(text, kind) {
    if (!msgBox) return;
    msgBox.textContent = text;
    msgBox.className = `dynamic_message ${kind}`;
  }

  async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to load users');
    return res.json();
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = (usernameInput?.value || '').trim();
    const password = passwordInput?.value || '';

    if (!username || !password) {
      showMessage('Please enter both username and password.', 'error');
      return;
    }

    showMessage('Checking credentials...', 'success');

    try {
      const users = await fetchUsers();

      const user = users.find(u => String(u.username || '').toLowerCase() === username.toLowerCase());

      if (!user) {
        showMessage('Invalid username or password.', 'error');
        return;
      }

      if (String(user.email || '') !== password) {
        showMessage('Invalid username or password.', 'error');
        return;
      }

      showMessage('Login successful! Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = 'menu_view.html';
      }, 2000);
    } catch (err) {
      showMessage('Could not validate login right now. Please try again.', 'error');
    }
  });
})();
