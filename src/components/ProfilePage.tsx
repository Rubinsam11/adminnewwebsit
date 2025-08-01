import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Shield, 
  Settings, 
  Bell, 
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle
} from 'lucide-react';

interface ProfileData {
  name: string;
  sex: string;
  dob: string;
  email: string;
  phone: string;
  address?: string;
  profilePicture?: string;
  joinDate?: string;
  lastLogin?: string;
  role?: string;
}

interface ProfilePageProps {
  profile: ProfileData | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onNavigate, onLogout }) => {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProfileData>({
    name: '',
    sex: '',
    dob: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load profile data from props or localStorage
    if (profile) {
      setUserData(profile);
      setEditData(profile);
    } else {
      const storedData = localStorage.getItem('userProfile');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setUserData({
          ...parsed,
          joinDate: '2024-01-15',
          lastLogin: new Date().toISOString(),
          role: 'Admin'
        });
        setEditData(parsed);
      }
    }
  }, [profile]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUserData(editData);
    localStorage.setItem('userProfile', JSON.stringify(editData));
    setIsEditing(false);
    setIsSaving(false);
    
    alert('✅ Profile updated successfully!');
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('❌ Password must be at least 6 characters long!');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsSaving(false);
    
    alert('✅ Password updated successfully!');
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditData(prev => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/50"
        >
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Profile Data</h2>
          <p className="text-gray-600 mb-6">No profile information is available at the moment.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('dashboard')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            ← Back to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Profile Management</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden mx-auto">
                  {(isEditing ? editData.profilePicture : userData.profilePicture) ? (
                    <img 
                      src={isEditing ? editData.profilePicture : userData.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isEditing ? editData.name : userData.name}
              </h2>
              <p className="text-gray-600 mb-4">{userData.role || 'Admin'}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userData.joinDate ? new Date(userData.joinDate).toLocaleDateString() : 'Recently'}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Last login: {userData.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : 'Today'}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Change Password</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsEditing(false);
                        setEditData(userData);
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{userData.name}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      name="sex"
                      value={editData.sex}
                      onChange={handleEditChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg capitalize">{userData.sex}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="dob"
                        value={editData.dob}
                        onChange={handleEditChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {new Date(userData.dob).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{userData.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{userData.phone}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={editData.address || ''}
                      onChange={handleEditChange}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your address..."
                    />
                  </div>
                ) : (
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                    {userData.address || 'No address provided'}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Password Change Modal */}
        {showPasswordChange && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                Change Password
              </h3>

              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePasswordUpdate}
                  disabled={isSaving}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  <span>Update Password</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;