import React, { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Camera, Trash2, RefreshCw, UploadCloud, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileImageUpload = () => {
  const { user, uploadAvatar, removeAvatar } = useAuth();
  const [preview, setPreview] = useState(user?.avatar || null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      setIsUploading(true);
      setUploadProgress(10);
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 50); // first half of progress
        setUploadProgress(progress);
      }
    };

    reader.onload = async () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);

      try {
        // Upload with simulated second half of progress
        await uploadAvatar(dataUrl, (progress) => {
          setUploadProgress(50 + Math.round(progress / 2));
        });
        toast.success('Profile picture updated successfully!');
      } catch (err) {
        toast.error('Image upload failed. Please try again.');
        setPreview(user?.avatar || null); // Revert to old image
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file.');
      setIsUploading(false);
      setUploadProgress(0);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      try {
        await removeAvatar();
        setPreview(null);
        toast.success('Profile picture removed.');
      } catch (err) {
        toast.error('Failed to remove profile picture.');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <h3 className="text-base font-bold text-gray-800 self-start">Profile Image</h3>
      
      <div className="relative group w-32 h-32">
        {/* Image Frame */}
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#FFF7F8] shadow-inner bg-gray-100 flex items-center justify-center relative">
          {preview ? (
            <img 
              src={preview} 
              alt={user?.name || 'Profile'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <UploadCloud className="w-8 h-8 mb-1" />
              <span className="text-[10px] uppercase font-semibold tracking-wider">No Image</span>
            </div>
          )}

          {/* Loader Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white p-2">
              <RefreshCw className="w-6 h-6 animate-spin mb-1 text-[#FF4D6D]" />
              <span className="text-xs font-bold">{uploadProgress}%</span>
            </div>
          )}
        </div>

        {/* Floating camera trigger */}
        {!isUploading && (
          <button
            type="button"
            onClick={triggerFileInput}
            className="absolute bottom-1 right-1 p-2 bg-[#FF4D6D] hover:bg-[#E63956] text-white rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            title="Change image"
          >
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      {/* Control Buttons */}
      <div className="flex gap-2 w-full justify-center">
        {preview && !isUploading && (
          <>
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 border border-red-100 hover:bg-red-50 text-red-600 rounded-xl transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </>
        )}
      </div>

      <div className="text-center">
        <p className="text-[11px] text-gray-400">Accepts PNG, JPG, WebP. Maximum size 2MB.</p>
        {isUploading && (
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpload;
