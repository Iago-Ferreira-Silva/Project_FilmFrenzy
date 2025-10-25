// Autenticação client-side simples usando localStorage.
// Armazena usuários em 'ff_users' (array de {email, passwordHash, createdAt}).

export async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getUsers() {
  try {
    const raw = localStorage.getItem('ff_users');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Erro ao ler usuários:', e);
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem('ff_users', JSON.stringify(users));
}

export async function register(email, password) {
  email = String(email).trim().toLowerCase();
  if (!email || !password) throw new Error('E-mail e senha são necessários');
  const users = getUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('Já existe uma conta com esse e-mail');
  }
  const passwordHash = await hashPassword(password);
  const user = { email, passwordHash, createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  return { email }; // retorno simples
}

export async function login(email, password) {
  email = String(email).trim().toLowerCase();
  if (!email || !password) throw new Error('E-mail e senha são necessários');
  const users = getUsers();
  const passwordHash = await hashPassword(password);
  const user = users.find(u => u.email === email && u.passwordHash === passwordHash);
  if (!user) throw new Error('E-mail ou senha incorretos');
  // Salva usuário atual (simples) — apenas e-mail e timestamp
  const session = { email: user.email, loggedAt: new Date().toISOString() };
  localStorage.setItem('ff_currentUser', JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem('ff_currentUser');
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('ff_currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getCurrentUser();
}
