import './App.css';
import { RouterProvider } from 'react-router-dom';
import route from './Route';
// import { useMoch } from './Api/--MOCH--';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // useMoch()
  return (
    <>
      <div className='w-full h-dvh flex overflow-hidden justify-center items-center '>
        <div className='w-full max-w-xl'>
          <RouterProvider router={route} />
          <ToastContainer />
        </div>          
      </div>
    </>
  )
}

export default App
