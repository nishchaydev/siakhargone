import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Try standard constructor first
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) return date;

  // Try DD-MM-YYYY format (common in India/UK)
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    // Assume DD-MM-YYYY
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    // Strict check to prevent auto-correction (e.g. 30-02 -> 01-03)
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }
  }

  return null;
}

export function formatDate(dateStr: string): string {
  const date = parseDateString(dateStr);
  if (!date) return dateStr; // Return original if parsing fails

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function optimizeCloudinaryUrl(url: string, width?: number): string {
  if (!url || typeof url !== 'string' || !url.includes("cloudinary.com")) return url;

  const isValidWidth = typeof width === 'number' && Number.isFinite(width) && width > 0;
  const validWidth = isValidWidth ? Math.round(width as number) : undefined;

  const uploadPath = url.includes("/video/upload") ? "/video/upload" : "/image/upload";
  if (url.includes(uploadPath)) {
    const parts = url.split(uploadPath);
    let pathAfterUpload = parts[1];

    // If it starts with /v followed by digits, there are no transformations
    const hasTransformations = !/^\/v\d+\//.test(pathAfterUpload);

    if (hasTransformations) {
      const pathParts = pathAfterUpload.split("/");
      if (pathParts.length > 1) {
        let existingTransform = pathParts[1];
        if (existingTransform) {
          // Insert/update f_auto, q_auto
          if (!existingTransform.includes("f_auto")) {
            existingTransform += ",f_auto";
          }
          if (!existingTransform.includes("q_auto")) {
            existingTransform += ",q_auto";
          }
          if (isValidWidth && validWidth !== undefined && !existingTransform.includes("w_")) {
            existingTransform += `,w_${validWidth},c_limit`;
          }
          pathParts[1] = existingTransform;
          pathAfterUpload = pathParts.join("/");
          return `${parts[0]}${uploadPath}${pathAfterUpload}`;
        }
      }
      return url;
    } else {
      let transformationStr = "f_auto,q_auto";
      if (isValidWidth && validWidth !== undefined) {
        transformationStr += `,w_${validWidth},c_limit`;
      }
      return `${parts[0]}${uploadPath}/${transformationStr}${pathAfterUpload}`;
    }
  }

  return url;
}
