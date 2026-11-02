/**
 * Client-side browser image compression utility
 * Resizes photos to max 1600px and compresses to WebP / JPEG at ~80% quality
 * Ensures fast page load times and mobile-friendly upload bandwidth
 */

export interface CompressionResult {
  blob: Blob;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}

export async function compressImage(
  file: File | Blob,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.8
): Promise<CompressionResult> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image'));
      img.onload = () => {
        let { width, height } = img;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP format, fallback to JPEG
        const mimeType = 'image/webp';

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              // Fallback to jpeg if webp unsupported
              canvas.toBlob(
                (fallbackBlob) => {
                  if (!fallbackBlob) {
                    reject(new Error('Image compression failed'));
                    return;
                  }
                  resolve({
                    blob: fallbackBlob,
                    previewUrl: URL.createObjectURL(fallbackBlob),
                    originalSize,
                    compressedSize: fallbackBlob.size,
                    width,
                    height
                  });
                },
                'image/jpeg',
                quality
              );
              return;
            }

            resolve({
              blob,
              previewUrl: URL.createObjectURL(blob),
              originalSize,
              compressedSize: blob.size,
              width,
              height
            });
          },
          mimeType,
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
