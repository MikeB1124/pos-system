import OrderHistory from "../../components/admin/OrderHistory";
import Sidebar from "../../components/admin/Sidebar";


function Orders(){
    return (
        <div>
            <Sidebar/>
            <OrderHistory/>
        </div>
    );
}

export default Orders;