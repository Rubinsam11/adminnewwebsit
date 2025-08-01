import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Newspaper, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      alert('Invalid credentials. Use admin/admin123');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-white-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-white-600 rounded-full mb-6 shadow-lg"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-200 to-white-200 bg-clip-text text-transparent"
          >
            News Admin
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-blue-100/80 text-lg"
          >
            Secure Admin Portal
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-blue-100 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-200/60"
                placeholder="Enter your username"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label className="block text-sm font-medium text-blue-100 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-200/60"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple -600 text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            {isLoading ? (
              <div className="flex items-center justify-center relative z-10">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Signing in...
              </div>
            ) : (
              <span className="relative z-10">Sign In to Dashboard</span>
            )}
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <p className="text-blue-100/70 text-sm mb-2">Demo Credentials:</p>
            <div className="space-y-1">
              <p className="text-blue-200 font-mono text-sm">Username: admin</p>
              <p className="text-blue-200 font-mono text-sm">Password: admin123</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;