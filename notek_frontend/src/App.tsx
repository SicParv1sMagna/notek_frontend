import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, Editor } from './Pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditorById } from './Pages/Editor/EditorById';
import { Authorization } from './Pages/Authorization/Authorization';
import { Registration } from './Widgets/Authorization/Registration';

const { invoke } = (window as any).__TAURI__.tauri;

function App() {
  useEffect(() => {
    // Create a new Tauri window
    invoke('tauri', { cmd: 'create' })
      .then((response: any) => console.log(response))
      .catch((error: any) => console.error(error));

    return () => {
      // Optionally, close the Tauri window when the component unmounts
      invoke('tauri', { cmd: 'close' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.error(error));
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/notek_frontend" element={<MainPage />} />
          <Route path="/notek_frontend/editor" element={<Editor />} />
          <Route path="/notek_frontend/editor/:id" element={<EditorById />} />
          <Route path="/notek_frontend/authorization" element={<Authorization />} />
          <Route path="/notek_frontend/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
