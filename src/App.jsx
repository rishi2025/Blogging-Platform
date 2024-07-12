import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Footer, Header } from "./components/index.jsx";
// import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(import.meta.env.VITE_TEST);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {

        if (userData)
          dispatch(login({ userData }));

        else
          dispatch(logout());

      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    loading ?
      (
        <h1>Loading...</h1>
      ):
      (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block">
            <Header />
            <main>
              {
                // <Outlet />
              }
            </main>
            <Footer />
          </div>
        </div>
    )
  )
}

export default App;
