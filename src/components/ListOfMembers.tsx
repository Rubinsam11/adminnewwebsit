import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Edit, 
  Trash2, 
  UserPlus,
  Download,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  lastActive: string;
  totalPosts: number;
  engagement: number;
}

interface ListOfMembersProps {
  onNavigate: (page: string) => void;
}

const ListOfMembers: React.FC<ListOfMembersProps> = ({ onNavigate }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [showActions, setShowActions] = useState<number | null>(null);

  useEffect(() => {
    // Mock data for demonstration
    const mockMembers: Member[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        joinDate: '2024-01-15',
        status: 'active',
        lastActive: '2 hours ago',
        totalPosts: 45,
        engagement: 85
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        joinDate: '2024-02-20',
        status: 'active',
        lastActive: '1 day ago',
        totalPosts: 32,
        engagement: 92
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+1234567892',
        joinDate: '2024-03-10',
        status: 'inactive',
        lastActive: '1 week ago',
        totalPosts: 12,
        engagement: 45
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+1234567893',
        joinDate: '2024-01-05',
        status: 'active',
        lastActive: '5 minutes ago',
        totalPosts: 78,
        engagement: 96
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david@example.com',
        phone: '+1234567894',
        joinDate: '2024-02-28',
        status: 'active',
        lastActive: '3 hours ago',
        totalPosts: 23,
        engagement: 67
      }
    ];
    setMembers(mockMembers);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesFilter = filterBy === 'all' || member.status === filterBy;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'joinDate':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      case 'engagement':
        return b.engagement - a.engagement;
      default:
        return 0;
    }
  });

  const handleSelectMember = (id: number) => {
    setSelectedMembers(prev => 
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 80) return 'text-green-600 bg-green-100';
    if (engagement >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Members Management</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100/80 hover:bg-green-200/80 text-green-700 rounded-lg transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Member</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Members', value: members.length, icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'Active Members', value: members.filter(m => m.status === 'active').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'Inactive Members', value: members.filter(m => m.status === 'inactive').length, icon: XCircle, color: 'from-red-500 to-red-600' },
            { label: 'New This Month', value: 3, icon: UserPlus, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="all">All Members</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="joinDate">Sort by Join Date</option>
                <option value="engagement">Sort by Engagement</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Members Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/50"
        >
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200/50 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {selectedMembers.length > 0 ? `${selectedMembers.length} selected` : 'Select all'}
                </span>
              </div>
              {selectedMembers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                    Send Message
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors">
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Member</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Activity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Engagement</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                <AnimatePresence>
                  {filteredMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => handleSelectMember(member.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">Joined {new Date(member.joinDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{member.totalPosts} posts</p>
                          <p className="text-xs text-gray-500">Last active: {member.lastActive}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                member.engagement >= 80 ? 'bg-green-500' :
                                member.engagement >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${member.engagement}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getEngagementColor(member.engagement)}`}>
                            {member.engagement}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Edit Member"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No members found matching your criteria.</p>
              <p className="text-gray-400 text-sm">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ListOfMembers;