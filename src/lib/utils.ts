import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const ALLOWED_FILE_TYPES = ["c", "h"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateFileType(file: File): boolean {
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return ALLOWED_FILE_TYPES.includes(fileExtension);
}
