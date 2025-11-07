import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

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

const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onNavigate,
  onLogout,
}) => {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProfileData>({
    name: "",
    sex: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setUserData(profile);
      setEditData(profile);
    } else {
      const storedData = localStorage.getItem("userProfile");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setUserData({
          ...parsed,
          joinDate: "2024-01-15",
          lastLogin: new Date().toISOString(),
          role: "Admin",
        });
        setEditData(parsed);
      }
    }
  }, [profile]);

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUserData(editData);
    localStorage.setItem("userProfile", JSON.stringify(editData));
    setIsEditing(false);
    setIsSaving(false);
    alert("✅ Profile updated successfully!");
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("❌ New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("❌ Password must be at least 6 characters long!");
      return;
    }
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsSaving(false);
    alert("✅ Password updated successfully!");
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditData((prev) => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center w-full max-w-sm border border-white/50"
        >
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-3">No Profile Data</h2>
          <p className="text-gray-600 mb-4">No profile information available.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate("dashboard")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:shadow-md transition-all text-sm"
          >
            ← Back to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate("dashboard")}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </motion.button>

          <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" /> Profile Management
          </h1>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
              >
                <Edit className="inline w-4 h-4 mr-1" />
                Edit
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={onLogout}
              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 text-center border border-white/50">
              <div className="relative mb-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto overflow-hidden flex items-center justify-center">
                  {editData.profilePicture ? (
                    <img
                      src={editData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-[35%] sm:right-[40%] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
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

              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{userData.role || "Admin"}</p>

              <div className="text-gray-600 text-sm space-y-1">
                <p className="flex justify-center items-center gap-1">
                  <Calendar className="w-4 h-4" /> Joined{" "}
                  {new Date(userData.joinDate || "").toLocaleDateString()}
                </p>
                <p className="flex justify-center items-center gap-1">
                  <Shield className="w-4 h-4" /> Last login:{" "}
                  {new Date(userData.lastLogin || "").toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5 border-t border-gray-200 pt-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Change Password
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/50"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4">Profile Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name", icon: User },
                { label: "Gender", name: "sex", type: "select" },
                { label: "Date of Birth", name: "dob", type: "date", icon: Calendar },
                { label: "Email", name: "email", icon: Mail },
                { label: "Phone", name: "phone", icon: Phone },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>
                  {isEditing ? (
                    field.type === "select" ? (
                      <select
                        name={field.name}
                        value={(editData as any)[field.name]}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <div className="relative">
                        {field.icon && (
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        )}
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={(editData as any)[field.name]}
                          onChange={handleEditChange}
                          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    )
                  ) : (
                    <p className="bg-gray-50 p-2 rounded-lg text-sm">
                      {(userData as any)[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={editData.address || ""}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter address"
                />
              ) : (
                <p className="bg-gray-50 p-2 rounded-lg text-sm">
                  {userData.address || "No address provided"}
                </p>
              )}
            </div>

            {/* Save / Cancel */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-2 justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex justify-center items-center gap-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsEditing(false)}
                  className="flex-1 sm:flex-none bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 text-sm flex justify-center items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Password Modal */}
        {showPasswordChange && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm sm:max-w-md"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-600" /> Change Password
              </h3>
              {["current", "new", "confirm"].map((key) => (
                <div key={key} className="mb-3">
                  <label className="block text-sm mb-1 capitalize">
                    {key} Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPasswords[key as keyof typeof showPasswords] ? "text" : "password"}
                      name={`${key}Password`}
                      value={(passwordData as any)[`${key}Password`]}
                      onChange={handlePasswordChange}
                      className="w-full pl-9 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          [key]: !prev[key as keyof typeof prev],
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords[key as keyof typeof showPasswords] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handlePasswordUpdate}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm flex justify-center items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Update
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowPasswordChange(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 text-sm flex justify-center items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;