import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useRbacStore } from '../store/rbacStore';

function RoleModal({ role, onClose, onSave }) {
  const [roleData, setRoleData] = useState(role || {
    name: '',
    description: '',
    permissions: []
  });
  const { permissions } = useRbacStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {role ? 'Edit Role' : 'Add New Role'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(roleData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={roleData.name}
                onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={roleData.description}
                onChange={(e) => setRoleData({ ...roleData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="space-y-2">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={roleData.permissions.includes(permission.name)}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...roleData.permissions, permission.name]
                          : roleData.permissions.filter(p => p !== permission.name);
                        setRoleData({ ...roleData, permissions: newPermissions });
                      }}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {role ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Roles() {
  const { roles, addRole, updateRole, deleteRole } = useRbacStore();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (roleData) => {
    if (selectedRole) {
      updateRole(selectedRole.id, roleData);
    } else {
      addRole({ ...roleData, id: roles.length + 1 });
    }
    setShowModal(false);
    setSelectedRole(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Role Management</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Role
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{role.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowModal(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <RoleModal
            role={selectedRole}
            onClose={() => {
              setShowModal(false);
              setSelectedRole(null);
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Roles;