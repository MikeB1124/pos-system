import './App.css';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import UserDashboard from './pages/UserDashboard.js';
import Error from './pages/Error.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/userdashboard" element={<UserDashboard/>}/>
          <Route exact path="/error" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
