import FileIcon from "@/components/ui/FileIcon";

type FileListProps = {
  filesList: File[];
};

const FilesList: React.FC<FileListProps> = ({ filesList }) => {
  return (
    <>
      {filesList.map((file: File, index: number) => {
        return (
          <div
            key={index}
            className="rounded flex justify-center items-center flex-col bg-muted"
          >
            <div>
              <FileIcon />
            </div>
            <p>{file.name}</p>
          </div>
        );
      })}
    </>
  );
};
export default FilesList;
