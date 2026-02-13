import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Try standard constructor first
  let date = new Date(dateStr);
  if (!isNaN(date.getTime())) return date;

  // Try DD-MM-YYYY format (common in India/UK)
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    // Assume DD-MM-YYYY
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);

    date = new Date(year, month, day);
    if (!isNaN(date.getTime())) return date;
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
