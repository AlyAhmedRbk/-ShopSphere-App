import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [], // Mock persistent user DB
      error: null,
      loading: false,

      // Initialize with a default demo user if DB is empty
      init: () => {
        const currentUsers = get().users;
        if (currentUsers.length === 0) {
          set({ 
            users: [{ 
              id: 'demo-1',
              name: 'Alex Johnson', 
              email: 'alex@demo.com', 
              password: 'password123',
              avatar: 'AJ'
            }] 
          });
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        await new Promise(r => setTimeout(r, 1200)); // Simulate network latency
        
        const user = get().users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...safeUser } = user;
          set({ user: safeUser, isAuthenticated: true, loading: false, error: null });
          return true;
        } else {
          set({ error: 'Invalid email or password', loading: false });
          return false;
        }
      },

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        await new Promise(r => setTimeout(r, 1500));
        
        const exists = get().users.find(u => u.email === email);
        if (exists) {
          set({ error: 'An account with this email already exists', loading: false });
          return false;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
        };

        set(state => ({
          users: [...state.users, newUser],
          user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar },
          isAuthenticated: true,
          loading: false,
          error: null
        }));
        
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.init();
      }
    }
  )
);
