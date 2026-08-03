import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export const apiRegister = async ({ email, username, password }) => {
  const response = await api.post("/auth/register", {
    email,
    username,
    password
  })

  return response.data;
}

export const apiLogin = async ({ email, username, password }) => {
  const response = await api.post("/auth/login", {
    email,
    username,
    password
  })

  return response.data;
}

export const apiGetMe = async () => {
  const response = await api.get("/auth/get-me");
  return response.data;
}

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data
}