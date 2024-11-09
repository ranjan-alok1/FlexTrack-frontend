import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8080/api/v1/users/",
  baseURL: "https://flextrack-backend.onrender.com/api/v1/users/",
});

export const UserSignUp = async (data) => API.post("/register", data);
export const UserSignIn = async (data) => API.post("/login", data);

export const getDashboardDetails = async (token) =>
  API.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
