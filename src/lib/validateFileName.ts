interface ValidateFileNameProps {
  file: File;
  files: File[];
}

export function validateFileName({
  file,
  files,
}: ValidateFileNameProps): boolean {
  let fileCounter = 0;
  files.forEach((x) => {
    if (x.name === file.name) fileCounter++;
  });

  if (fileCounter === 0) return true;
  return false;
}
