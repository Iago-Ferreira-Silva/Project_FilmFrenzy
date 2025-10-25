import { register, login } from './auth.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleRegisterBtn = document.getElementById('btn-toggle-register');
const cancelRegisterBtn = document.getElementById('btn-cancel-register');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

function showMessage(el, text, isError = false) {
  el.textContent = text;
  el.style.color = isError ? '#c0392b' : '#16a085';
}

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

loginForm?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    showMessage(loginMessage, 'Acessando...', false);
    await login(email, password);
    showMessage(loginMessage, 'Login efetuado com sucesso! Redirecionando...');
    // pequeno delay para mostrar a mensagem
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 700);
  } catch (err) {
    showMessage(loginMessage, err.message || 'Erro ao efetuar login', true);
  }
});

registerForm?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const email = document.getElementById('r-email').value;
  const password = document.getElementById('r-password').value;
  try {
    showMessage(registerMessage, 'Criando conta...', false);
    await register(email, password);
    showMessage(registerMessage, 'Conta criada com sucesso! Você já pode entrar.');
    setTimeout(() => {
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      registerMessage.textContent = '';
    }, 900);
  } catch (err) {
    showMessage(registerMessage, err.message || 'Erro ao criar conta', true);
  }
});
