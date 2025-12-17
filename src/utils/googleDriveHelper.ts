// googleDriveHelper.ts
// Stable Google Drive image resolver with fallback

const extractFileId = (url: string): string | null => {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]{25,})/,
    /id=([a-zA-Z0-9_-]{25,})/,
    /thumbnail\?id=([a-zA-Z0-9_-]{25,})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
};

export const fixGoogleDriveUrl = (url: string): string => {
  if (!url) return '';

  console.log('Google Drive Helper - Original URL:', url);

  const fileId = extractFileId(url);
  if (!fileId) {
    console.warn('Google Drive Helper - Could not extract file ID');
    return url;
  }

  console.log('Google Drive Helper - Extracted File ID:', fileId);

  // ✅ MOST RELIABLE FORMAT
  const viewUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  console.log('Google Drive Helper - Using uc?export=view URL:', viewUrl);
  return viewUrl;
};

export const getGoogleDriveThumbnail = (
  url: string,
  size: number = 800
): string => {
  const fileId = extractFileId(url);
  if (!fileId) return url;

  // Thumbnail ONLY when explicitly needed
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
};

export const isValidGoogleDriveUrl = (url: string): boolean => {
  return Boolean(extractFileId(url));
};
