import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import UserDashboard from './pages/user/UserDashboard';
import LoginForm from './pages/LoginForm.js'
import MenuItems from './pages/admin/MenuItems'
import Orders from './pages/admin/Orders'
import Profile from './pages/admin/Profile'
import Locations from "./pages/admin/Locations.js";
import PaymentSuccess from "../src/components/admin/PaymentSuccess"
import Printers from "./pages/admin/Printers.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm/>}/>
          <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route exact path="/user-dashboard" element={<UserDashboard/>}/>
          <Route exact path="/admin-dashboard/menu-items" element={<MenuItems/>}/>
          <Route exact path="/admin-dashboard/locations" element={<Locations/>}/>
          <Route exact path="/admin-dashboard/printers" element={<Printers/>}/>
          <Route exact path="/admin-dashboard/orders" element={<Orders/>}/>
          <Route exact path="/admin-dashboard/profile" element={<Profile/>}/>
          <Route exact path="/success" element={<PaymentSuccess/>}/>
          <Route exact path="/cancel" element={<h1>Fail</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
