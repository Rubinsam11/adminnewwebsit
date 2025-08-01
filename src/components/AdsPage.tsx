import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Eye, 
  Send, 
  Clock, 
  Tag, 
  FolderOpen,
  Image as ImageIcon,
  Video,
  Store,
  MapPin,
  Phone,
  Globe,
  Users,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface AdsPageProps {
  onNavigate: (page: string) => void;
}

const AdsPage: React.FC<AdsPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    shopName: '',
    description: '',
    contactInfo: '',
    location: '',
    website: '',
    tag: '',
    category: '',
    price: '',
    discount: ''
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [currentTime, setCurrentTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles(prev => [...prev, ...files].slice(0, 5));
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Ad Data:', {
      ...formData,
      mediaFiles: mediaFiles.map(f => f.name),
      timestamp: currentTime
    });

    alert('✅ Advertisement posted successfully and sent to customers!');
    
    setFormData({
      shopName: '',
      description: '',
      contactInfo: '',
      location: '',
      website: '',
      tag: '',
      category: '',
      price: '',
      discount: ''
    });
    setMediaFiles([]);
    setIsSubmitting(false);
  };

  const categories = [
    { value: 'restaurant', label: '🍽️ Restaurant', color: 'text-red-600' },
    { value: 'retail', label: '🛍️ Retail Store', color: 'text-blue-600' },
    { value: 'services', label: '🔧 Services', color: 'text-green-600' },
    { value: 'healthcare', label: '🏥 Healthcare', color: 'text-purple-600' },
    { value: 'education', label: '📚 Education', color: 'text-indigo-600' },
    { value: 'automotive', label: '🚗 Automotive', color: 'text-yellow-600' },
    { value: 'beauty', label: '💄 Beauty & Spa', color: 'text-pink-600' },
    { value: 'real-estate', label: '🏠 Real Estate', color: 'text-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
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
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Store className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Create Advertisement</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-100/80 hover:bg-orange-200/80 text-orange-700 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!previewMode ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Form */}
              <div className="lg:col-span-2">
                <motion.form
                  onSubmit={handleSubmit}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-white/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Shop Name */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <Store className="w-5 h-5 text-orange-500" />
                      <span>Business/Shop Name</span>
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      placeholder="Enter your business or shop name..."
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-lg bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <span>Advertisement Description</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your products, services, or special offers..."
                      rows={4}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Contact & Location Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span>Contact Information</span>
                      </label>
                      <input
                        type="text"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleInputChange}
                        placeholder="Phone number, email..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>Location/Address</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Business address..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Price & Discount Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>Price/Starting From</span>
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="₹999 or Starting from ₹500..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span>Special Offer/Discount</span>
                      </label>
                      <input
                        type="text"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        placeholder="20% OFF, Buy 1 Get 1 Free..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span>Website (Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Media Upload */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <Upload className="w-5 h-5 text-purple-500" />
                      <span>Business Photos/Videos</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-orange-400 transition-colors bg-white/30 backdrop-blur-sm">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="hidden"
                        id="media-upload"
                      />
                      <label
                        htmlFor="media-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-gray-600 text-center">
                          Upload photos of your business, products, or services
                          <br />
                          <span className="text-sm text-gray-400">Max 5 files, Images & Videos supported</span>
                        </p>
                      </label>
                    </div>

                    {/* Media Preview */}
                    {mediaFiles.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {mediaFiles.map((file, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                              {file.type.startsWith('image/') ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                                  <Video className="w-8 h-8 text-orange-600" />
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMedia(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Publishing Advertisement...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Publish Advertisement to Customers</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Ad Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FolderOpen className="w-5 h-5 mr-2 text-orange-600" />
                    Advertisement Settings
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Category */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FolderOpen className="w-4 h-4" />
                        <span>Business Category</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Tag className="w-4 h-4" />
                        <span>Tags</span>
                      </label>
                      <input
                        type="text"
                        name="tag"
                        value={formData.tag}
                        onChange={handleInputChange}
                        placeholder="new, discount, quality, local..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Customer Reach */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Customer Reach
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{currentTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Will reach 2,450+ potential customers</span>
                    </div>
                    <div className="text-sm opacity-90">
                      Your advertisement will be visible to all customers and sent via push notifications.
                    </div>
                  </div>
                </motion.div>

                {/* Ad Performance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Expected Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Estimated Views</span>
                      <span className="font-bold text-blue-600">1,800+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Click Rate</span>
                      <span className="font-bold text-green-600">12-15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer Inquiries</span>
                      <span className="font-bold text-purple-600">50-80</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Preview Mode */
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-white/50"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-4xl font-bold text-gray-800 flex items-center">
                    <Store className="w-8 h-8 mr-3 text-orange-500" />
                    {formData.shopName || 'Your Business Name Here'}
                  </h2>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ADVERTISEMENT
                  </div>
                </div>
                
                {formData.discount && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg inline-block mb-4 font-bold">
                    🎉 {formData.discount}
                  </div>
                )}

                <p className="text-xl text-gray-700 leading-relaxed mb-4">
                  {formData.description || 'Your advertisement description will appear here...'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {formData.contactInfo && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>{formData.contactInfo}</span>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{formData.location}</span>
                    </div>
                  )}
                  {formData.price && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">{formData.price}</span>
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <a href={formData.website} className="text-blue-600 hover:underline">{formData.website}</a>
                    </div>
                  )}
                </div>
              </div>

              {mediaFiles.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaFiles.slice(0, 4).map((file, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Business Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                            <Video className="w-12 h-12 text-orange-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.tag && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {formData.tag.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-center font-medium">
                  📱 This is how your advertisement will appear to customers
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdsPage;