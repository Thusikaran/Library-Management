import axios from "axios";

const API_URL = "http://localhost:5127/api";

export const checkLogin = async (userName: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/account/login`, {
      userName,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token); 
      localStorage.setItem("username", response.data.userName); 
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Login failed with status code " + response.status };
    }
  } catch (error: any) {
    console.error("Login error:", error);

    if (error.response) {
      return { success: false, message: error.response.data?.message || "Invalid username or password" };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};

export const getAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5127/api/Book');
      return response.data; 
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error; 
    }
  }

  export const deleteBook = async (bookId: number) => {
    try {
        const response = await axios.delete(`http://localhost:5127/api/Book/`+bookId)
        if (!response) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};

// services/Service.ts
export const addBook = async (book: { title: string; author: string; description: string }) => {
    try {
        const response = await axios.post("http://localhost:5127/api/Book",book);
        if (!response) throw new Error("Failed to add the book");
        return response;
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

export const updateBook = async (book: { title: string; author: string; description: string },bookId:any) => {
    try {
        const response = await axios.put("http://localhost:5127/api/Book/"+bookId,book);
        if (!response) throw new Error("Failed to update the book");
        return response;
    } catch (error) {
        console.error("Error updateing book:", error);
        throw error;
    }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};


