import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  History, 
  Filter, 
  Search, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Newspaper,
  Store,
  UserPlus,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

interface HistoryItem {
  id: number;
  type: 'news' | 'ad' | 'user' | 'system';
  title: string;
  action: string;
  date: string;
  author: string;
  details?: string;
  status: 'success' | 'pending' | 'failed';
  views?: number;
  engagement?: number;
}

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7days');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    // Mock history data
    const mockHistory: HistoryItem[] = [
      {
        id: 1,
        type: 'news',
        title: 'Breaking News: Local Event Coverage',
        action: 'Published',
        date: '2024-01-15T10:30:00Z',
        author: 'Admin',
        status: 'success',
        views: 1240,
        engagement: 85,
        details: 'Article about local community event with high engagement'
      },
      {
        id: 2,
        type: 'ad',
        title: 'New Restaurant Opening - Grand Launch',
        action: 'Created',
        date: '2024-01-14T15:45:00Z',
        author: 'Admin',
        status: 'success',
        views: 890,
        engagement: 72,
        details: 'Advertisement for new restaurant with special offers'
      },
      {
        id: 3,
        type: 'news',
        title: 'Weather Update: Heavy Rain Alert',
        action: 'Updated',
        date: '2024-01-13T09:15:00Z',
        author: 'Admin',
        status: 'success',
        views: 2100,
        engagement: 92,
        details: 'Important weather alert for the community'
      },
      {
        id: 4,
        type: 'user',
        title: 'New User Registration - Sarah Wilson',
        action: 'Registered',
        date: '2024-01-12T14:20:00Z',
        author: 'System',
        status: 'success',
        details: 'New member joined the community'
      },
      {
        id: 5,
        type: 'ad',
        title: 'Electronics Store - Mega Sale',
        action: 'Published',
        date: '2024-01-11T11:30:00Z',
        author: 'Admin',
        status: 'success',
        views: 1560,
        engagement: 78,
        details: 'Electronics sale advertisement with discount offers'
      },
      {
        id: 6,
        type: 'system',
        title: 'Database Backup Completed',
        action: 'Backup',
        date: '2024-01-10T02:00:00Z',
        author: 'System',
        status: 'success',
        details: 'Automated system backup completed successfully'
      }
    ];
    setHistory(mockHistory);
  }, []);

  const analyticsData = [
    { name: 'Mon', news: 12, ads: 8, users: 5 },
    { name: 'Tue', news: 19, ads: 12, users: 8 },
    { name: 'Wed', news: 8, ads: 6, users: 3 },
    { name: 'Thu', news: 25, ads: 15, users: 12 },
    { name: 'Fri', news: 22, ads: 18, users: 9 },
    { name: 'Sat', news: 30, ads: 22, users: 15 },
    { name: 'Sun', news: 18, ads: 14, users: 7 }
  ];

  const pieData = [
    { name: 'News', value: 45, color: '#3B82F6' },
    { name: 'Ads', value: 30, color: '#10B981' },
    { name: 'Users', value: 15, color: '#F59E0B' },
    { name: 'System', value: 10, color: '#8B5CF6' }
  ];

  const filteredHistory = history.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return <Newspaper className="w-5 h-5" />;
      case 'ad': return <Store className="w-5 h-5" />;
      case 'user': return <UserPlus className="w-5 h-5" />;
      case 'system': return <Settings className="w-5 h-5" />;
      default: return <History className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'ad': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('dashboard')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </motion.button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <History className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Activity History & Analytics</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Activity Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
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
                <Area type="monotone" dataKey="news" stackId="1" stroke="#3B82F6" fill="url(#colorNews)" />
                <Area type="monotone" dataKey="ads" stackId="1" stroke="#10B981" fill="url(#colorAds)" />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#F59E0B" fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Activity Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={item.name + index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Activities', value: history.length, icon: History, color: 'from-blue-500 to-blue-600', change: '+12%' },
            { label: 'News Published', value: history.filter(h => h.type === 'news').length, icon: Newspaper, color: 'from-green-500 to-green-600', change: '+8%' },
            { label: 'Ads Created', value: history.filter(h => h.type === 'ad').length, icon: Store, color: 'from-purple-500 to-purple-600', change: '+15%' },
            { label: 'New Users', value: history.filter(h => h.type === 'user').length, icon: Users, color: 'from-orange-500 to-orange-600', change: '+5%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50"
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

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="all">All Activities</option>
                <option value="news">News</option>
                <option value="ad">Advertisements</option>
                <option value="user">Users</option>
                <option value="system">System</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/50"
        >
          <div className="px-6 py-4 border-b border-gray-200/50 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">Activity History</h3>
          </div>
          <div className="divide-y divide-gray-200/50">
            <AnimatePresence>
              {filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-800 truncate">
                            {item.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                            {item.action}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>By {item.author}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.date).toLocaleString()}</span>
                          </span>
                          {item.views && (
                            <>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{item.views} views</span>
                              </span>
                            </>
                          )}
                          {item.engagement && (
                            <>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>{item.engagement}% engagement</span>
                              </span>
                            </>
                          )}
                        </div>
                        {item.details && (
                          <p className="text-sm text-gray-600">{item.details}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-600 hover:text-green-800 p-2"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No activities found for the selected filter.</p>
              <p className="text-gray-400 text-sm">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryPage;