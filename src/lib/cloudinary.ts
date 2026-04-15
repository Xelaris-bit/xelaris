import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a base64 encoded file to Cloudinary.
 * If the input is already a valid HTTP URL, it returns it unchanged.
 * 
 * @param fileData - The base64 string or an existing URL
 * @param folder - The subfolder in Cloudinary where the file should reside
 * @returns The secure URL from Cloudinary or the original string
 */
export async function uploadMedia(fileData: string | undefined | null, folder: string = 'general'): Promise<string> {
    if (!fileData) {
        return '';
    }

    // If it's already hosted on Cloudinary, don't re-upload
    if (fileData.includes('res.cloudinary.com')) {
        return fileData;
    }

    // If it's a base64 string or an external URL to fetch
    if (fileData.startsWith('data:') || fileData.startsWith('http://') || fileData.startsWith('https://')) {
        try {
            const result = await cloudinary.uploader.upload(fileData, {
                folder: `xelaris/${folder}`,
                resource_type: 'auto', // Automatically determine if it's an image or video
            });
            return result.secure_url;
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            // Fallback to storing the original data if upload fails (or we could throw)
            return fileData; 
        }
    }

    // Return as-is if it's something else (e.g., local path placeholders)
    return fileData;
}
