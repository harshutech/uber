import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const logoutCaptain = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.status === 200) {
              localStorage.removeItem('token');
              navigate('/captain-login');
            }
          } catch (error) {
            console.error('Error logging out:', error.message);
          }
        };
    
        logoutCaptain();
      }, [navigate, token]);
  
  return (
    <div>Logging out...</div>
  )
}

export default CaptainLogout