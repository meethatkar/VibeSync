import { api } from "../../../../apiClient";

export const getSongByMoodApi = async (mood) => {
  console.log("M:", mood);

  return await api.get(`/song/?mood=${mood}`);
};
