import axios from "axios";

const API_BASE_URL = "https://manageback.vercel.app";
export const getProjects = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/project`);
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch projects");
  }
};
