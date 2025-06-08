// app/components/courses/ApiTest2.tsx
import { getApiData } from "@/app/services/api/apiServerFetch";

const RowLessonsData = async () => {
  const { data, error, message } = await getApiData("/course-lessons/");

  if (error) {
    return <div>{error}</div>; // Shows all error messages including 403
  }

  if (message) {
    return <div>{message}</div>; // Shows empty data message
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default RowLessonsData;
