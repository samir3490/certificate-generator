import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Generator from "./pages/Generator";
import Verify from "./pages/Verify";
import './index.css'
function App() {
  const [auth, setAuth] = useState(sessionStorage.getItem("authenticated") === "true");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth ? <Navigate to="/generator" replace /> : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/generator"
          element={
            auth ? <Generator /> : <Navigate to="/" replace />
          }
        />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Router>
  );
}

export default App;