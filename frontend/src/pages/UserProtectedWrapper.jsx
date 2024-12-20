import React, { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [ isLoading, setIsLoading ] = useState(true);


  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/user-login");
    })
  }, [token]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div className="loading-spinner" /> {/* Add a spinner/animation here */}
        <p>Loading...</p>
      </div>
    );
  }





  return <>{children}</>;
};

export default UserProtectedWrapper;
