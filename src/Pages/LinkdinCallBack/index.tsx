import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LinkedInCallback: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract the authorization code from the URL query parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      console.log('Authorization code:', code);
      
      // You can send this code to your backend server to exchange it for an access token
      // Example:
      // fetch('http://localhost:3000/linkedin/callback', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ code }),
      // })
      // .then(response => response.json())
      // .then(data => console.log('Access Token Data:', data))
      // .catch(error => console.error('Error:', error));
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