import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from './Pages/Intro.jsx';
import Menu from './Pages/menu.jsx';
import Textanno from './Pages/Textanno/Textanno.jsx'
import Docx from './Pages/document.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        {/* <Route path="/menu" element={<Menu />} /> */}
        <Route path="/textannotiate" element={<Textanno />} />
        <Route path="/document" element={<Docx />} />

       {/* <Route/> */}
      </Routes>
    </Router>
  );
}
