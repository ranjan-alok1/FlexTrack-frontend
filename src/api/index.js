import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/v1/" 
    : "https://flextrack.onrender.com/api/v1/"; 

// Axios instance
const API = axios.create({
  baseURL,
  withCredentials: true, 
});

// Authentication
export const UserSignUp = async (data) =>
  API.post("users/register", data);

export const UserSignIn = async (data) =>
  API.post("users/login", data);

// Dashboard Details
export const getDashboardDetails = async (token) =>
  API.get("users/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Workouts
export const getWorkouts = async (token, date) =>
  API.get(`users/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  API.post("users/workout", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Blogs
export const getAllBlogs = async () => {
  try {
    const response = await API.get("blogs");
    if (response.data.success) {
      return response.data;
    } else {
      return { success: true, blogs: [] };
    }
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    return { success: false, blogs: [] };
  }
};

export const createBlog = async (token, data) =>
  API.post(
    "blogs",
    { title: data.title, content: data.content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
