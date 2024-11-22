import { create } from 'zustand';

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Editor User', email: 'editor@example.com', role: 'editor', status: 'active' },
];

const initialRoles = [
  { id: 1, name: 'admin', description: 'Full system access', permissions: ['all'] },
  { id: 2, name: 'editor', description: 'Content management', permissions: ['read', 'write'] },
  { id: 3, name: 'viewer', description: 'Read-only access', permissions: ['read'] },
];

const initialPermissions = [
  { id: 1, name: 'read', description: 'Can view content' },
  { id: 2, name: 'write', description: 'Can create and edit content' },
  { id: 3, name: 'delete', description: 'Can remove content' },
  { id: 4, name: 'all', description: 'Full system access' },
];

export const useRbacStore = create((set) => ({
  users: initialUsers,
  roles: initialRoles,
  permissions: initialPermissions,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, userData) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...userData } : user)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (id, roleData) =>
    set((state) => ({
      roles: state.roles.map((role) => (role.id === id ? { ...role, ...roleData } : role)),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));