// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Generator from "./pages/Generator";
import Verify from "./pages/Verify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/generate" />
            ) : (
              <Login setAuth={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/generate"
          element={isAuthenticated ? <Generator /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
