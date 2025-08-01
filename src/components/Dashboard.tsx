import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  User, 
  Plus, 
  BarChart3, 
  History, 
  Users, 
  Settings,
  LogOut,
  Newspaper,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  onShowAds: () => void;
  onShowMembers: () => void;
  onAddNews: () => void;
  onShowHistory: () => void;
  onShowNewRegister: () => void;
  onShowProfilePage: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  onShowAds,
  onShowMembers,
  onAddNews,
  onShowHistory,
  onShowNewRegister,
  onShowProfilePage,
  onLogout
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Posts', value: '156', icon: Newspaper, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Views Today', value: '2.4K', icon: Eye, color: 'from-green-500 to-green-600', change: '+8%' },
    { label: 'Active Users', value: '89', icon: Users, color: 'from-purple-500 to-purple-600', change: '+15%' },
    { label: 'Comments', value: '342', icon: MessageSquare, color: 'from-orange-500 to-orange-600', change: '+5%' }
  ];

  const quickActions = [
    { label: 'Create News', action: onAddNews, icon: Plus, color: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' },
    { label: 'View Analytics', action: onShowHistory, icon: BarChart3, color: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' },
    { label: 'Manage Ads', action: onShowAds, icon: TrendingUp, color: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' },
    { label: 'User Management', action: onShowMembers, icon: Users, color: 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800' }
  ];

  const chartData = [
    { name: 'Mon', posts: 12, views: 240 },
    { name: 'Tue', posts: 19, views: 380 },
    { name: 'Wed', posts: 8, views: 160 },
    { name: 'Thu', posts: 25, views: 500 },
    { name: 'Fri', posts: 22, views: 440 },
    { name: 'Sat', posts: 30, views: 600 },
    { name: 'Sun', posts: 18, views: 360 }
  ];

  const recentActivities = [
    { action: 'Published new article', time: '2 hours ago', type: 'success', user: 'Admin' },
    { action: 'Updated user permissions', time: '4 hours ago', type: 'info', user: 'Admin' },
    { action: 'Approved 3 comments', time: '6 hours ago', type: 'warning', user: 'Moderator' },
    { action: 'System backup completed', time: '1 day ago', type: 'success', user: 'System' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </motion.button>
              <div className="ml-4 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">News Admin Portal</h1>
                  <p className="text-xs text-gray-500">Content Management System</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 bg-gray-100/50 px-3 py-2 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span>{currentTime}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShowProfilePage}
                className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200/50 bg-white/90 backdrop-blur-sm"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={onShowNewRegister}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100/80 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span>New Register</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={onShowMembers}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100/80 transition-colors"
                  >
                    <Users className="w-5 h-5 text-gray-600" />
                    <span>Members</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-4xl font-bold mb-2">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-blue-100 text-lg">
              Manage your news content and engage with your audience
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`${action.color} text-white p-6 rounded-xl transition-all duration-300 flex flex-col items-center space-y-3 shadow-lg hover:shadow-xl`}
              >
                <action.icon className="w-8 h-8" />
                <span className="font-semibold text-lg">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analytics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Analytics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8fafc', 
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="posts"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorPosts)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <History className="w-5 h-5 mr-2 text-green-600" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50/80 transition-colors border border-gray-100/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-gray-800 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={onShowHistory}
              className="w-full mt-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
            >
              View All Activity
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;