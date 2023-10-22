import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Pages'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
