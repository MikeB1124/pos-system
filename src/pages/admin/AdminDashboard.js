import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styled from 'styled-components';
import Sidebar from "../../components/admin/Sidebar";
import '../../styles/AdminDashboard.css'

function AdminDashboard(){
    return (
        <Div>
            <Sidebar/>
        </Div>
    );
}

export default AdminDashboard;

const Div = styled.div``;