// signup.js
(function () {
  const form = document.getElementById('signup_form');
  const msgBox = document.getElementById('signup_message');

  function show(kind, text) {
    if (!msgBox) return;
    msgBox.className = `dynamic_message ${kind}`;
    msgBox.textContent = text;
  }

  function validateUsername(username) {
    // 3-20 chars, alphanumeric + - _, starts with letter, no spaces
    if (username.length < 3 || username.length > 20) return 'Username must be 3 to 20 characters long.';
    if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(username)) {
      return 'Username must start with a letter and contain only letters, numbers, hyphens, and underscores.';
    }
    return '';
  }

  function validatePassword(password) {
    if (password.length < 8) return 'Password must be at least 8 characters long.';
    if (/\s/.test(password)) return 'Password cannot contain spaces.';

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]/.test(password);

    if (!hasUpper || !hasLower || !hasNum || !hasSpecial) {
      return 'Password must include uppercase, lowercase, a number, and a special character.';
    }
    return '';
  }

  function validateEmail(email) {
    if (/\s/.test(email)) return 'Email cannot contain spaces.';
    // Must contain @ and domain (.com, .net, .io)
    if (!/^[^@\s]+@[^@\s]+\.(com|net|io)$/.test(email)) {
      return 'Email must be in a valid format (example@domain.com/.net/.io).';
    }
    return '';
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = (document.getElementById('su_username')?.value || '').trim();
    const email = (document.getElementById('su_email')?.value || '').trim();
    const password = document.getElementById('su_password')?.value || '';
    const confirm = document.getElementById('su_confirm')?.value || '';

    const uErr = validateUsername(username);
    if (uErr) return show('error', uErr);

    const eErr = validateEmail(email);
    if (eErr) return show('error', eErr);

    const pErr = validatePassword(password);
    if (pErr) return show('error', pErr);

    if (confirm !== password) return show('error', 'Confirm Password must match Password.');

    show('success', 'Signup successful! Redirecting to Login...');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
})();
