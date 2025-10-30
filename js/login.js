import { register, login } from './auth.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleRegisterBtn = document.getElementById('btn-toggle-register');
const cancelRegisterBtn = document.getElementById('btn-cancel-register');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');
const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');

function showMessage(el, text, isError = false) {
  el.textContent = text;
  el.style.color = isError ? '#ff5c5c' : '#16a085';
}

// Alterna entre formulários
toggleRegisterBtn?.addEventListener('click', () => {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  loginMessage.textContent = '';
});

cancelRegisterBtn?.addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  registerMessage.textContent = '';
});

// LOGIN
loginForm?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email.includes('@') || password.length < 6) {
    showMessage(loginMessage, 'Preencha os campos corretamente.', true);
    return;
  }

  try {
    btnLogin.disabled = true;
    showMessage(loginMessage, 'Acessando...');
    await login(email, password);
    showMessage(loginMessage, 'Login efetuado com sucesso! Redirecionando...');
    setTimeout(() => window.location.href = 'index.html', 1000);
  } catch (err) {
    showMessage(loginMessage, err.message || 'Erro ao efetuar login', true);
  } finally {
    btnLogin.disabled = false;
  }
});

// REGISTER
registerForm?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const email = document.getElementById('r-email').value.trim();
  const password = document.getElementById('r-password').value.trim();

  if (!email.includes('@') || password.length < 6) {
    showMessage(registerMessage, 'Preencha os campos corretamente.', true);
    return;
  }

  try {
    btnRegister.disabled = true;
    showMessage(registerMessage, 'Criando conta...');
    await register(email, password);
    showMessage(registerMessage, 'Conta criada com sucesso! Você já pode entrar.');
    setTimeout(() => {
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      registerMessage.textContent = '';
    }, 900);
  } catch (err) {
    showMessage(registerMessage, err.message || 'Erro ao criar conta', true);
  } finally {
    btnRegister.disabled = false;
  }
});