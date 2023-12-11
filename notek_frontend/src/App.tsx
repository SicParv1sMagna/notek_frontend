import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage, Editor } from './Pages'
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditorById } from './Pages/Editor/EditorById';
import { Authorization } from './Pages/Authorization/Authorization';
import { Registration } from './Pages/Registration/Registration';
import { Requests } from './Pages/Requests/Requests';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/notek_frontend" element={<MainPage />} />
          <Route path="/notek_frontend/editor" element={<Editor />} />
          <Route path="/notek_frontend/editor/:id" element={<EditorById />} />
          <Route path="/notek_frontend/authorization" element={<Authorization />} />
          <Route path="/notek_frontend/registration" element={<Registration />} />
          <Route path="/notek_frontend/requests" element={<Requests />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
