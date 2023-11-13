import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage, Editor } from './Pages'
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditorById } from './Pages/Editor/EditorById';
import { useState } from 'react';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<EditorById />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
