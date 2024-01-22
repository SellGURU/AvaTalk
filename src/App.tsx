import './App.css';
import { RouterProvider } from 'react-router-dom';
import route from './Route';

function App() {

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center overflow-hidden '>
        <div className='w-full max-w-xl'>
          <RouterProvider router={route} />
        </div>          
      </div>
    </>
  )
}

export default App
