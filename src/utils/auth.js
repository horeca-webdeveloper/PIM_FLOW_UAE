// src/utils/auth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // You can add more checks like token expiry here
    return !!token;
  };
  