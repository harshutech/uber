import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UseLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.status === 200) {
              localStorage.removeItem('token');
              navigate('/user-login');
            }
          } catch (error) {
            console.error('Error logging out:', error.message);
          }
        };
    
        logoutUser();
      }, [navigate, token]);
  
  return (
    <div>Logging out...</div>
  )
}

export default UseLogout