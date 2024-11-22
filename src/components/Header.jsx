import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Header() {
  const { logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">RBAC Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            <button 
              onClick={logout}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;