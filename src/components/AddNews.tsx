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
  FileText,
  Save,
  Sparkles,
  Globe,
  Users,
  Calendar,
  Settings
} from 'lucide-react';

interface AddNewsProps {
  onNavigate: (page: string) => void;
}

const AddNews: React.FC<AddNewsProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    headline: '',
    description: '',
    content: '',
    tag: '',
    category: '',
    postedBy: 'Admin'
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
    setMediaFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('News Data:', {
      ...formData,
      mediaFiles: mediaFiles.map(f => f.name),
      timestamp: currentTime
    });

    alert('✅ News published successfully and sent to customers!');
    
    // Reset form
    setFormData({
      headline: '',
      description: '',
      content: '',
      tag: '',
      category: '',
      postedBy: 'Admin'
    });
    setMediaFiles([]);
    setIsSubmitting(false);
  };

  const categories = [
    { value: 'breaking', label: '🚨 Breaking News', color: 'text-red-600' },
    { value: 'politics', label: '🏛️ Politics', color: 'text-blue-600' },
    { value: 'sports', label: '⚽ Sports', color: 'text-green-600' },
    { value: 'technology', label: '💻 Technology', color: 'text-purple-600' },
    { value: 'entertainment', label: '🎬 Entertainment', color: 'text-pink-600' },
    { value: 'business', label: '💼 Business', color: 'text-yellow-600' },
    { value: 'health', label: '🏥 Health', color: 'text-teal-600' },
    { value: 'education', label: '📚 Education', color: 'text-indigo-600' }
  ];

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
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Create News Article</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-700 rounded-lg transition-colors"
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
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-white/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Headline */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      <span>Headline</span>
                    </label>
                    <input
                      type="text"
                      name="headline"
                      value={formData.headline}
                      onChange={handleInputChange}
                      placeholder="Enter an engaging headline that will attract customers..."
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span>Description</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Write a compelling description that summarizes the news..."
                      rows={4}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <FileText className="w-5 h-5 text-green-500" />
                      <span>Full Article Content</span>
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write the complete article content that customers will read..."
                      rows={12}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Media Upload */}
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                      <Upload className="w-5 h-5 text-purple-500" />
                      <span>Media Files</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors bg-white/30 backdrop-blur-sm">
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
                          Click to upload images or videos for customers
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
                            key={file.name + index} // add unique key
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
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                                  <Video className="w-8 h-8 text-purple-600" />
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Publishing to Customers...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Publish News to Customers</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Article Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-600" />
                    Article Settings
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Category */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FolderOpen className="w-4 h-4" />
                        <span>Category</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
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
                        placeholder="trending, breaking, local, urgent..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4" />
                        <span>Author</span>
                      </label>
                      <input
                        type="text"
                        name="postedBy"
                        value={formData.postedBy}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Publish Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Customer Distribution
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{currentTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Will reach 2,450+ customers</span>
                    </div>
                    <div className="text-sm opacity-90">
                      This article will be immediately visible to all customers after publishing and sent via notifications.
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Articles Published</span>
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Views</span>
                      <span className="font-bold text-green-600">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer Engagement</span>
                      <span className="font-bold text-purple-600">85%</span>
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
                  <h2 className="text-4xl font-bold text-gray-800">{formData.headline || 'Your Headline Here'}</h2>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    LIVE PREVIEW
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>By {formData.postedBy}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{currentTime}</span>
                  </span>
                  {formData.category && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {categories.find(c => c.value === formData.category)?.label || formData.category}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-2 rounded-r-lg">
                  {formData.description || 'Your description will appear here...'}
                </p>
              </div>

              {mediaFiles.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaFiles.slice(0, 4).map((file, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                            <Video className="w-12 h-12 text-purple-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
                  {formData.content || 'Your article content will appear here...'}
                </div>
              </div>

              {formData.tag && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {formData.tag.split(',').map((tag, index) => (
                      <span
                        key={tag.trim() + index} // add unique key
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center font-medium">
                  📱 This is how your news will appear to customers on their devices
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddNews;