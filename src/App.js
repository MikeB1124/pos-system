import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import UserDashboard from './pages/UserDashboard';
import LoginForm from './pages/LoginForm.js'
import SignupForm from './pages/SignupForm.js'
import MenuItems from './pages/admin/MenuItems'
import Orders from './pages/admin/Orders'
import Profile from './pages/admin/Profile'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginForm/>}/>
          <Route exact path="/signup" element={<SignupForm/>}/>
          <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route exact path="/user-dashboard" element={<UserDashboard/>}/>
          <Route exact path="/admin-dashboard/menu-items" element={<MenuItems/>}/>
          <Route exact path="/admin-dashboard/orders" element={<Orders/>}/>
          <Route exact path="/admin-dashboard/profile" element={<Profile/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
