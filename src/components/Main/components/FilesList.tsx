import { Dispatch, SetStateAction } from "react";
import FileIcon from "@/components/ui/FileIcon";

type FileListProps = {
  filesList: File[];
  setFilesList: Dispatch<SetStateAction<never[]>>;
};

const FilesList: React.FC<FileListProps> = ({ filesList, setFilesList }) => {
  return (
    <>
      {filesList.map((file: File, index: number) => {
        return (
          <div
            key={index}
            className="rounded p-2 flex justify-center items-center flex-col bg-muted relative"
          >
            <div className="mb-2">
              <FileIcon />
            </div>
            <p className="text-wrap">{file.name}</p>
            <div
              className="absolute top-0 right-0"
              onClick={() => {
                setFilesList(filesList.filter((x) => x.name !== file.name));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-trash-2 text-red-500 cursor-pointer -translate-y-1/4 translate-x-1/4"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default FilesList;
