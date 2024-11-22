import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Shield, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/roles', icon: Shield, label: 'Roles' },
  { path: '/permissions', icon: Key, label: 'Permissions' },
];

function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">RBAC Admin</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r"
                    layoutId="sidebar-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;