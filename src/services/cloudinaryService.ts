// src/services/cloudinaryService.ts

// @ts-ignore - Skip type checking for import.meta.env
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// @ts-ignore
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    console.error('Missing Cloudinary configuration');
    throw new Error('Server configuration error. Please try again later.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to upload image');
    }

    if (!data.secure_url) {
      throw new Error('No image URL returned from Cloudinary');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};