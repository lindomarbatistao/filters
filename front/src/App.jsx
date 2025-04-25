import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Patrimonios from "./pages/patrimonios";
import Importar from "./pages/importar";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/patrimonios" element={<Patrimonios />} />
        <Route path="/impo" element={<Importar />} />
      </Routes>
    </Router>
  )
}

export default App