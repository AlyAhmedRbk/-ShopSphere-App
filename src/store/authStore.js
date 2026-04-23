import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MOCK_USERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@demo.com', password: 'demo1234', avatar: 'AJ' },
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      error: null,

      login: async (email, password) => {
        await new Promise(r => setTimeout(r, 800));
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (!user) {
          set({ error: 'Invalid email or password' });
          return false;
        }
        const { password: _p, ...safeUser } = user;
        set({ user: safeUser, isAuthenticated: true, error: null });
        return true;
      },

      register: async (name, email, password) => {
        await new Promise(r => setTimeout(r, 800));
        const exists = MOCK_USERS.find(u => u.email === email);
        if (exists) {
          set({ error: 'Email already in use' });
          return false;
        }
        const newUser = { id: Date.now(), name, email, avatar: name.slice(0, 2).toUpperCase() };
        MOCK_USERS.push({ ...newUser, password });
        set({ user: newUser, isAuthenticated: true, error: null });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: 'auth-storage' }
  )
);
