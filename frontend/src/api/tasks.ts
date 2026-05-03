import API from "./axios";

export const getTasks = async (
  projectId: number,
  status?: string
) => {
  let url = `/tasks/?project_id=${projectId}`;

  if (status && status !== "all") {
    url += `&status=${status}`;
  }

  const res = await API.get(url);
  return res.data;
};