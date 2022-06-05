import { defaultInstance } from ".";

// const createMajor = (data) => {
//   return defaultInstance.post("/majors", data);
// };

// const updateMajor = (id, data) => {
//   return defaultInstance.put(`/majors/${id}`, data);
// };

// const getMajorById = (id) => {
//   return defaultInstance.get(`/majors/${id}`);
// };

// const deleteMajor = (id, data) => {
//   return defaultInstance.delete(`/majors/${id}`);
// };

const getAllMajor = () => {
  return defaultInstance.get(`/majors/`);
};

export const majorApis = { getAllMajor };
