import Sidebar from "../../components/admin/Sidebar";
import FetchPrintersDataGrid from "../../components/admin/FetchPrintersDataGrid"

function Printers(){
    return(
        <div>
            <Sidebar/>
            <FetchPrintersDataGrid/>
        </div>
    )
}

export default Printers;