import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react';
import AuthProvider from './context/auth';

// import Home from './pages/Home'
// // import Navbar from './components/Navbar'
// import Register from './pages/Register';
// import Login from './pages/Login';
import PrivateRoute from './private-routes/PrivateRoute'
import { Home, Login, Register } from './pages/pages-container/pages-container'
import { Navbar } from './components/components-container/components-container'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <Navbar />
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
            <Route exact="true" path="/register" element={<Register />} />
            <Route exact="true" path="/login" element={<Login />} />
          </Routes>
        </Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
