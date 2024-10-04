/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css';
import { RouterProvider } from 'react-router-dom';
import route from './Route';
// import { useMoch } from './Api/--MOCH--';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { handleDivices } from './help';
import { useEffect } from 'react';


function App() {
  handleDivices()
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the Tab key behavior globally
      }
    };

    // Add the event listener globally when the app mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);  
  return (
    <>
      <div className='w-full h-dvh font-poppins flex overflow-hidden justify-center items-center '>
        <div className='w-full max-w-[32rem]'>
            <GoogleOAuthProvider clientId="750278697489-u68emmire3d35234obo1mne9v0eobmsu.apps.googleusercontent.com">
              <RouterProvider router={route} />
              <ToastContainer   limit={1} />
            </GoogleOAuthProvider>
        </div>          
      </div>
    </>
  )
}

export default App
