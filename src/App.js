import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.js";
import UserDashboard from './pages/AdminDashboard.js';
import LoginForm from './pages/LoginForm.js'
import SignupForm from './pages/SignupForm.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginForm/>}/>
          <Route exact path="/signup" element={<SignupForm/>}/>
          <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route exact path="/user-dashboard" element={<UserDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
