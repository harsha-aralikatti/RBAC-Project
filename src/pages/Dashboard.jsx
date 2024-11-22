import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Key, Activity } from 'lucide-react';
import { useRbacStore } from '../store/rbacStore';

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${color}`}
    >
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-gray-100">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Dashboard() {
  const { users, roles, permissions } = useRbacStore();

  const stats = [
    { icon: Users, title: 'Total Users', value: users.length, color: 'border-blue-500' },
    { icon: Shield, title: 'Roles', value: roles.length, color: 'border-green-500' },
    { icon: Key, title: 'Permissions', value: permissions.length, color: 'border-yellow-500' },
    { icon: Activity, title: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'border-purple-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to your RBAC management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium">{role.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {users.filter(u => u.role === role.name).length} users
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;