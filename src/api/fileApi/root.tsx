import { Day } from "@/app/features/days/daysSlice";
const SUCCESS = { status: true, data: {}, message: "success" };
const FAIL = { status: false, data: {}, message: "fail" };

interface FileApi {
  url: string;
  sendFilesRequest: (argc: {
    day: Day[];
    filesList: File[];
  }) => Promise<{ status: boolean; data: {}; message: string }>;
}

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
  sendFilesRequest: async (argc: { day: Day[]; filesList: File[] }) => {
    const url = fileApi.url + "test";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: setFilesFormData({ day: argc.day[0], filesList: argc.filesList }),
      });
      if (!res.ok) return FAIL;
      const data = await res.json();
      return { ...SUCCESS, data };
    } catch {
      return FAIL;
    }
  },
};
export default fileApi;
