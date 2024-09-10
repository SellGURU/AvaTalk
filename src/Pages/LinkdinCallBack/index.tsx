import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const LinkedInCallback: React.FC = () => {
  const location = useLocation();
const getToken=async (code:string)=>{
  try {
      const response = await axios.get(
          `https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:5173/linkedin/callback&client_id=786lwqvw2unoip&client_secret=1pxmz4fEh5TwUbZP` );
      console.log(response.data); // Access token should be in response.data
    } catch (e) {
    console.log("error:", e);
      if (e.response) {
        console.log("Error:", e.response.data); // Detailed error from LinkedIn API
      } else {
        console.log("Error:", e.message);
      }
    }

}
  useEffect(() => {
    // Extract the authorization code from the URL query parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      console.log('Authorization code:', code);
      // getToken(code);
    } else {
      console.error('No authorization code found');
    }
  }, [location]);

  return (
    <div>
      <h2>Processing LinkedIn Login...</h2>
    </div>
  );
};

export default LinkedInCallback;