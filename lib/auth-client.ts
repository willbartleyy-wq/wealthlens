type StoredUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type PublicUser = {
  firstName: string;
  lastName: string;
  email: string;
};

const USER_STORE_KEY = "wealthlens_users";
const SESSION_KEY = "wealthlens_session";
const TEST_USER_EMAIL = "test@wealthlens.com";
const TEST_USER_PASSWORD = "Test1234";

const DEFAULT_TEST_USER: StoredUser = {
  firstName: "Test",
  lastName: "User",
  email: TEST_USER_EMAIL,
  password: TEST_USER_PASSWORD,
};

function getUserStore(): Record<string, StoredUser> {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(USER_STORE_KEY);
  const store = raw ? JSON.parse(raw) : {};

  if (!store[TEST_USER_EMAIL]) {
    store[TEST_USER_EMAIL] = DEFAULT_TEST_USER;
    window.localStorage.setItem(USER_STORE_KEY, JSON.stringify(store));
  }

  return store;
}

function setUserStore(store: Record<string, StoredUser>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_STORE_KEY, JSON.stringify(store));
}

export function getCurrentUser(): PublicUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const session = window.localStorage.getItem(SESSION_KEY);
  if (!session) {
    return null;
  }

  const email = session;
  const store = getUserStore();
  const user = store[email];
  if (!user) {
    return null;
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

export function createAccount(data: StoredUser): { success: boolean; error?: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Browser-only auth." };
  }

  const email = data.email.trim().toLowerCase();
  const store = getUserStore();

  if (store[email]) {
    return { success: false, error: "An account with that email already exists." };
  }

  store[email] = {
    ...data,
    email,
  };
  setUserStore(store);
  window.localStorage.setItem(SESSION_KEY, email);

  return { success: true };
}

export function authenticate(email: string, password: string): { success: boolean; error?: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Browser-only auth." };
  }

  const normalized = email.trim().toLowerCase();
  const store = getUserStore();
  const user = store[normalized];

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password." };
  }

  window.localStorage.setItem(SESSION_KEY, normalized);
  return { success: true };
}

export function signOut() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}
