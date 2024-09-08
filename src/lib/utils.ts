import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const ALLOWED_FILE_TYPES = ["c", "h"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
