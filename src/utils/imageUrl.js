// Utility to format and resolve complete image URLs across the application
export const DEFAULT_FALLBACK_IMAGE = "/default-food.jpeg";

export const getBackendBaseUrl = () => {
  let apiUrl = import.meta.env.VITE_API_URL || "https://my-backend-eateryapp.onrender.com/api";

  // Remove trailing /api or /api/
  apiUrl = apiUrl.replace(/\/api\/?$/, "");

  // If in production/remote environment and URL points to localhost, default to Render backend
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      apiUrl = "https://my-backend-eateryapp.onrender.com";
    }
  }

  return apiUrl.replace(/\/+$/, "");
};

/**
 * Resolves complete image URL for display.
 * Checks local storage cache for uploaded base64 images if available.
 *
 * @param {string|object} imageInput - Image path string or meal object
 * @param {string} [identifier] - Optional meal ID or name
 * @returns {string} Resolved image URL or Base64 Data URL
 */
export const getImageUrl = (imageInput, identifier = "") => {
  let imagePath = "";
  let idKey = identifier;

  if (imageInput && typeof imageInput === "object") {
    imagePath = imageInput.image || "";
    idKey = imageInput._id || imageInput.id || imageInput.name || identifier;
  } else if (typeof imageInput === "string") {
    imagePath = imageInput;
  }

  // Check localStorage for client-side uploaded base64 cache
  if (typeof window !== "undefined" && idKey) {
    const cached = localStorage.getItem(`eatery_img_${idKey}`);
    if (cached && cached.startsWith("data:image")) {
      return cached;
    }
  }

  if (!imagePath || typeof imagePath !== "string") {
    return DEFAULT_FALLBACK_IMAGE;
  }

  let cleanPath = imagePath.trim();

  if (!cleanPath) {
    return DEFAULT_FALLBACK_IMAGE;
  }

  // Handle base64 data URLs
  if (cleanPath.startsWith("data:image")) {
    return cleanPath;
  }

  // Convert Windows backslashes (e.g. uploads\123.png) to forward slashes
  cleanPath = cleanPath.replace(/\\/g, "/");

  // Strip localhost origin if saved in DB during local dev (e.g. http://localhost:5000/uploads/file.png)
  cleanPath = cleanPath.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, "");

  // Handle full external URLs (e.g. https://images.unsplash.com/... or https://res.cloudinary.com/...)
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }

  // Ensure leading slash
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  const baseUrl = getBackendBaseUrl();
  return `${baseUrl}${cleanPath}`;
};

export const handleImageError = (e, identifier = "") => {
  if (e && e.currentTarget) {
    e.currentTarget.onerror = null;
    if (identifier && typeof window !== "undefined") {
      const cached = localStorage.getItem(`eatery_img_${identifier}`);
      if (cached && cached.startsWith("data:image")) {
        e.currentTarget.src = cached;
        return;
      }
    }
    e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
  }
};

export default getImageUrl;
