import Landing from "./components/Landing";
import DayItem from "./components/DayItem";
import FilesList from "./components/FilesList";
import LoadingSpinner from "../ui/loadingspinner";
import fileApi from "@/api/fileApi/root";
import TestResult from "./components/TestResult";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { validateFileType } from "@/lib/validateFileType";
import { validateFileName } from "@/lib/validateFileName";
import { toast } from "sonner";
import { Day } from "@/app/features/days/daysSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { choseDay } from "@/app/features/days/daysSlice";
import { Data } from "@/api/fileApi/root";
import { Accordion } from "@radix-ui/react-accordion";

const validDay = (days: Day[]) => {
  const selectedDaysList = days.filter((day) => day.isOpened === true);
  if (selectedDaysList.length === 1) return true;
  return false;
};

const Main = () => {
  const dispatch = useDispatch();
  const [dragActive, setDragActive] = useState(false);
  const [filesList, setFilesList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [responseData, setResponseData] = useState<Data>({});
  const [responseStatus, setResponseStatus] = useState(false);

  const { days } = useSelector((state: RootState) => state.days);

  /*
   * handleFormSubmit:
   * - checks if there are files in the list.
   * - checks if a day got selected.
   */
  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();

    if (filesList.length === 0) {
      toast.warning("Add files");
      return;
    }
    if (!validDay(days)) {
      toast.warning("Select a day");
      return;
    }
    const day = days.filter((day) => day.isOpened === true);
    setIsLoading(true);
    const { status, data, message } = await fileApi.sendFilesRequest({
      day,
      filesList,
    });
    if (!status) {
      toast.warning(message);
      setIsLoading(false);
      return;
    }
    setResponseStatus(true);
    setResponseData(data);
    setIsLoading(false);
  };

  // handleDrag
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  // handleDrop
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // validate file type
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter(
        (file) =>
          validateFileType(file) &&
          validateFileName({ file: file, files: filesList }),
      );
      if (files.length !== validFiles.length) toast.warning("Invalid file");
      setFilesList((prevFilesList: File[]) => {
        return [...prevFilesList, ...validFiles];
      });
    }
    setDragActive(false);
  };

  // handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // at least one file has been selevted
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(
        (file) =>
          validateFileType(file) &&
          validateFileName({ file: file, files: filesList }),
      );
      if (files.length !== validFiles.length) toast.warning("Invalid file");
      setFilesList((prevFilesList: File[]) => {
        const newState = [...prevFilesList, ...validFiles];
        return newState;
      });
    }
  };

  return (
    <div className="container mx-auto flex flex-wrap">
      {/* Landing */}
      <Landing />

      {/* main */}
      <main className="flex gap-5 flex-row flex-wrap w-full pt-8">
        <aside className="lg:pl-5 lg:w-[150px] w-full flex justify-center gap-1 flex-row flex-wrap lg:block">
          {days.map((day: Day, index: number) => {
            return (
              <div
                className="min-w-20"
                key={index}
                onClick={() => {
                  dispatch(choseDay(day.name));
                }}
              >
                <DayItem day={day} index={index} />
              </div>
            );
          })}
        </aside>

        <div className="h-full flex flex-wrap gap-4 flex-1">
          {/* Start Input */}
          <div className="h-full flex-1 mx-[30px] md:mx-0">
            <div className="h-full">
              <div className="h-full">
                <div className="flex flex-col h-full rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-center md:text-left">
                      Files
                    </h3>
                  </div>
                  <form
                    className="p-6 pt-0 flex-1"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onSubmit={handleFormSubmit}
                  >
                    <div className="h-full flex flex-col flex-wrap gap-2">
                      <div
                        role="presentation"
                        className={`border rounded border-border p-4 flex flex-1 justify-center ${
                          dragActive
                            ? "dark:border-slate-400 dark:bg-slate-800 "
                            : ""
                        } `}
                      >
                        <input
                          onChange={handleChange}
                          className="hidden"
                          multiple
                          id="file-input"
                          accept=".c,.h"
                          type="file"
                          name="file"
                          value={[]}
                        />
                        <div className="flex-1 min-h-[360px]">
                          {filesList.length === 0 ? (
                            <label
                              className="p-16 justify-center items-center w-full h-full flex flex-col gap-4 cursor-pointer"
                              htmlFor="file-input"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-10 w-10 fill-current"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <div className="items-center justify-center text-center">
                                <p className="text-sm text-zinc-600">
                                  Drag &amp; drop files here, or click to select
                                  files
                                </p>
                                <span
                                  className="text-xs text-zinc-500 dark:text-zinc-300"
                                  id="file_type_help"
                                >
                                  Supported File Types: .c .h
                                </span>
                              </div>
                            </label>
                          ) : (
                            <div className="w-full h-full grid bg-cover sm:grid-cols-3 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-3 gap-6">
                              <FilesList
                                filesList={filesList}
                                setFilesList={setFilesList}
                              />
                              <label
                                className="cursor-pointer rounded p-2 flex justify-center items-center flex-col bg-muted relative"
                                htmlFor="file-input"
                              >
                                {/* icon */}
                                <div className="mb-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-10 w-10 fill-current"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </div>
                                <p className="text-wrap">Add Files</p>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <p
                        className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-300"
                        id="file_input_help"
                      >
                        Don't be Dumb and upload other files. Such a moran.
                      </p>
                      <div className="flex flex-col sm:flex-row w-full gap-3">
                        <div className="flex-1">
                          <Button
                            type="reset"
                            className="w-full"
                            onClick={() => {
                              setFilesList([]);
                              setIsLoading(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="flex-1">
                          <Button className="w-full" type="submit">
                            Start Blending
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* End Input */}

          {/* Start Output*/}
          <div className="md:h-full w-full md:w-1/3 lg:w-1/3 mx-[30px] md:mx-0">
            <div className="lg:h-full h-[600px]">
              <div className="h-full">
                <div className="flex flex-col h-full rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-center md:text-left">
                      Tests
                    </h3>
                  </div>
                  <div className="p-6 pt-0 flex-1">
                    {isLoading ? (
                      <div className="h-full w-full flex flex-col flex-wrap justify-center items-center gap-2">
                        <LoadingSpinner className="" />
                      </div>
                    ) : null}
                    {responseStatus ? (
                      <div className="border rounded border-border p-4">
                        {responseData.exercises.map((x) => (
                          <Accordion key={x} type="single" collapsible>
                            <TestResult
                              exercise={x}
                              fileTests={responseData.fileTests[x]}
                            />
                          </Accordion>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
