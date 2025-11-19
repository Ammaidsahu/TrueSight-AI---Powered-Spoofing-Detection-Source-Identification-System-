import { useState } from 'react'
import { motion } from 'framer-motion'
import CyberCard from '../../components/CyberCard'
import CyberButton from '../../components/CyberButton'

// Mock user data
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@truesight.com', role: 'admin', status: 'active', lastLogin: '2024-01-15 10:30:00' },
  { id: 2, username: 'user', email: 'user@truesight.com', role: 'user', status: 'active', lastLogin: '2024-01-15 09:15:00' },
  { id: 3, username: 'analyst1', email: 'analyst1@truesight.com', role: 'analyst', status: 'active', lastLogin: '2024-01-14 16:45:00' },
  { id: 4, username: 'reviewer1', email: 'reviewer1@truesight.com', role: 'reviewer', status: 'inactive', lastLogin: '2024-01-10 14:20:00' },
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user', password: '' })

  const handleAddUser = () => {
    if (newUser.username && newUser.email && newUser.password) {
      const user = {
        id: users.length + 1,
        ...newUser,
        status: 'active',
        lastLogin: 'Never'
      }
      setUsers([...users, user])
      setNewUser({ username: '', email: '', role: 'user', password: '' })
      setShowAddUser(false)
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ))
  }

  return (
    <div className="min-h-screen bg-cyber-black relative pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-5xl font-bold mb-4 glow-text-green text-cyber-green font-mono">
              MANAGE USER ACCOUNTS
            </h1>
            <p className="text-cyber-green/60 font-mono">
              Create, edit, and manage user accounts and permissions
            </p>
          </div>
          <CyberButton onClick={() => setShowAddUser(!showAddUser)}>
            {showAddUser ? 'CANCEL' : '+ ADD USER'}
          </CyberButton>
        </motion.div>

        {showAddUser && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <CyberCard className="p-6" glowColor="blue">
              <h3 className="text-xl font-bold mb-4 glow-text-blue text-cyber-blue font-mono">
                ADD NEW USER
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="terminal-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="terminal-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="terminal-input"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="terminal-input"
                >
                  <option value="user">User</option>
                  <option value="analyst">Analyst</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mt-4">
                <CyberButton onClick={handleAddUser} variant="blue">
                  CREATE USER
                </CyberButton>
              </div>
            </CyberCard>
          </motion.div>
        )}

        <CyberCard className="p-0" glowColor="green">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyber-green/30">
                  <th className="p-4 text-left text-cyber-green font-mono text-sm font-bold">USERNAME</th>
                  <th className="p-4 text-left text-cyber-green font-mono text-sm font-bold">EMAIL</th>
                  <th className="p-4 text-left text-cyber-green font-mono text-sm font-bold">ROLE</th>
                  <th className="p-4 text-left text-cyber-green font-mono text-sm font-bold">STATUS</th>
                  <th className="p-4 text-left text-cyber-green font-mono text-sm font-bold">LAST LOGIN</th>
                  <th className="p-4 text-left text-cyber-green font-mono text-sm font-bold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-cyber-green/10 hover:bg-cyber-green/5"
                  >
                    <td className="p-4 text-cyber-green font-mono">{user.username}</td>
                    <td className="p-4 text-cyber-green/80 font-mono text-sm">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded font-mono text-xs ${
                        user.role === 'admin' ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30' :
                        user.role === 'analyst' ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30' :
                        'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded font-mono text-xs ${
                        user.status === 'active' 
                          ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-cyber-green/60 font-mono text-xs">{user.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <CyberButton
                          onClick={() => handleToggleStatus(user.id)}
                          variant={user.status === 'active' ? 'blue' : 'green'}
                          className="text-xs px-3 py-1"
                        >
                          {user.status === 'active' ? 'DEACTIVATE' : 'ACTIVATE'}
                        </CyberButton>
                        <CyberButton
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-xs px-3 py-1 bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                        >
                          DELETE
                        </CyberButton>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CyberCard>
      </div>
    </div>
  )
}

