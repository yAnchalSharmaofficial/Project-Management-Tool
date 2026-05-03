import API from "./axios";

export const getProjects = async (page: number, search: string) => {
  const res = await API.get(
    `/projects/?page=${page}&search=${search}`
  );
  return res.data;
};