import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage, Editor } from './Pages'
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditorById } from './Pages/Editor/EditorById';
import { Authorization } from './Pages/Authorization/Authorization';
import { Registration } from './Widgets/Authorization/Registration';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<EditorById />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
