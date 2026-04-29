import { useState, useContext } from "react";
import { AuthContex } from "../auth.contex.jsx";
import { login, register } from "../services/auth.api";

export const useAuth = () => {
  const contex = useContext(AuthContex);
  const { user, setUser, loading, setLoading } = contex;
  const handleLogin = async (username, password) => {
    setLoading(true);
    const response = await login(username, password);
    setUser(response.user);
    setLoading(false);
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const response = await login(username, email, password);
    setUser(response.user);
    setLoading(false);
  };
  return {
    user,
    loading,
    handleLogin,
    handleRegister,
  };
};
