// Autenticação client-side simples usando localStorage.
// Armazena usuários em 'ff_users' (array de {email, passwordHash, createdAt}).

const STORAGE_KEYS = {
  USERS: 'ff_users',
  SESSION: 'ff_currentUser'
};

// --- Funções utilitárias ---

export async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function isValidEmail(email) {
  // Validação simples de formato
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Acesso ao localStorage ---

export function getUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Erro ao ler usuários:', e);
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// --- Registro de usuário ---

export async function register(email, password) {
  email = String(email).trim().toLowerCase();

  if (!email || !password)
    throw new Error('E-mail e senha são obrigatórios');

  if (!isValidEmail(email))
    throw new Error('Formato de e-mail inválido');

  if (password.length < 6)
    throw new Error('A senha deve ter pelo menos 6 caracteres');

  const users = getUsers();

  if (users.some(u => u.email === email))
    throw new Error('Já existe uma conta com esse e-mail');

  const passwordHash = await hashPassword(password);
  const user = { email, passwordHash, createdAt: new Date().toISOString() };

  users.push(user);
  saveUsers(users);

  return { email };
}

// --- Login de usuário ---

export async function login(email, password) {
  email = String(email).trim().toLowerCase();
  if (!email || !password)
    throw new Error('E-mail e senha são obrigatórios');

  const users = getUsers();
  const passwordHash = await hashPassword(password);
  const user = users.find(u => u.email === email && u.passwordHash === passwordHash);

  if (!user)
    throw new Error('E-mail ou senha incorretos');

  // Cria sessão (apenas exemplo simples)
  const session = {
    email: user.email,
    loggedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  return session;
}

// --- Sessão ---

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getCurrentUser();
}