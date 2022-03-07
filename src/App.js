// STUFF FROM REACT AND REACT-ROUTER-DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react';

// AUTH PROVIDER & PRIVATE-ROUTE
import AuthProvider from './context/auth';
import PrivateRoute from './private-routes/PrivateRoute'

// COMPONENTS & PAGES
// import { Navbar } from './components/components-container/components-container'
import { Home, Login, Register, Profile } from './pages/pages-container/pages-container'

import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <Routes>
            <Route
              exact="true"
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              exact="true"
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route exact="true" path="/register" element={<Register />} />
            <Route exact="true" path="/login" element={<Login />} />
          </Routes>
        </Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
