import { getCurrentUser, isAuthenticated, logout } from './auth.js';

// session.js: protege a página e injeta botão de logout no cabeçalho
document.addEventListener('DOMContentLoaded', () => {
  // redireciona para a tela de login se não estiver autenticado
  try {
    if (!isAuthenticated()) {
      // evita redirecionar se já estivermos na página de login
      if (!window.location.pathname.endsWith('login.html')) {
        window.location.href = 'login.html';
      }
      return;
    }

    const user = getCurrentUser();
    const container = document.getElementById('cabecalho_actions');
    if (!container) return;

    // avatar com inicial do e-mail e botão de logout
    const avatar = document.createElement('div');
    avatar.className = 'cabecalho_avatar';
    const initial = (user?.email || 'U').charAt(0).toUpperCase();
    avatar.textContent = initial;

    const info = document.createElement('div');
    info.className = 'cabecalho_user';
    info.textContent = user?.email || 'Usuário';

    const btn = document.createElement('button');
    btn.className = 'cabecalho_logout';
    btn.type = 'button';
    btn.textContent = 'Sair';
    btn.addEventListener('click', () => {
      logout();
      window.location.href = 'login.html';
    });

    container.appendChild(avatar);
    container.appendChild(info);
    container.appendChild(btn);
  } catch (e) {
    // em caso de erro, expulsa para login para forçar reautenticação
    console.error('Erro na verificação de sessão:', e);
    window.location.href = 'login.html';
  }
});
