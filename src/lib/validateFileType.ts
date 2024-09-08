import { ALLOWED_FILE_TYPES } from "./utils";

export function validateFileType(file: File): boolean {
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return ALLOWED_FILE_TYPES.includes(fileExtension);
}
