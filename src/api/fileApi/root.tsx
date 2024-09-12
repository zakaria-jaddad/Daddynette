import { Day } from "@/app/features/days/daysSlice";

interface Data {
  dayname: string;
  exercises: string[];
  fileTests: {};
}

interface ResponseContent {
  Status: boolean;
  Dayname: string;
  Exercises: string[];
  FilesTests: {};
  Message: string;
}

interface FormattedResponseContent {
  status: boolean;
  data: Data | undefined;
  message: string | undefined;
}

interface FileApi {
  url: string;
  formatResponse: (data: ResponseContent) => FormattedResponseContent;
  sendFilesRequest: (argc: {
    day: Day[];
    filesList: File[];
  }) => Promise<FormattedResponseContent>;
}

const FAIL: FormattedResponseContent = {
  status: false,
  data: undefined,
  message: "Something happened",
};

const setFilesFormData = ({
  day,
  filesList,
}: {
  day: Day;
  filesList: File[];
}) => {
  const formData = new FormData();
  formData.append("day-name", day.name);
  filesList.forEach((file) => {
    formData.append(file.name, file);
  });
  return formData;
};

const fileApi: FileApi = {
  url: "http://localhost:8090/",
  formatResponse: (data) => {
    return {
      status: data.Status,
      data: {
        dayname: data.Dayname,
        exercises: data.Exercises,
        fileTests: data.FilesTests,
      },
      message: data.Message,
    };
  },

  sendFilesRequest: async (argc: { day: Day[]; filesList: File[] }) => {
    const url = fileApi.url + "test";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: setFilesFormData({ day: argc.day[0], filesList: argc.filesList }),
      });
      if (!res.ok) return FAIL;
      const data = await res.json();
      console.log("this is real data", data);
      return fileApi.formatResponse(data);
    } catch {
      return FAIL;
    }
  },
};
export default fileApi;
