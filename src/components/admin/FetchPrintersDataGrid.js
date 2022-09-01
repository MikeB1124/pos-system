import PrintersDataGridFunctionality from "./PrintersDataGridFunctionality";
import {getPrinters} from "../../printerServices"
import {getUsers} from "../../userServices"
import { useEffect, useState } from "react";

function FetchPrintersDataGrid(){
    const groupID = localStorage.getItem('groupID');
    const [rows, setRowsTest] = useState([])
    const [locations, setLocations] = useState([])

    // useEffect(() => {
        
    // }, [])

    
    getPrinters().then((printers) => {
        printers.forEach((printer) =>{
            
            if(!checkPrinterDuplicate(printer) && printer.groupID == groupID){
                setRowsTest([...rows, {id: printer.printerID, printerName: printer.printerName, ssID: printer.ssID, ipAddress: printer.ipAddress, storeLocation: printer.storeLocation}])
            }
        })
        }).catch((err) => console.log(err))

    const promise = getUsers();

    promise.then((users) => {
        users.forEach((user) => {
            if(!checkUserDuplicate(user) && user.groupID == groupID && user.role === "client"){
                setLocations([...locations, user.street])
            }
        })
    })

    function checkUserDuplicate(user){
        for(let i = 0; i < locations.length; i++){
            if(user.street === locations[i]){
                return true;
            }
        }
        return false;
    }

    function checkPrinterDuplicate(printer){
        for(let i = 0; i < rows.length; i++){
            if(printer.printerID == rows[i].id){
                return true;
            }
        }
        return false;
    }



    return(
        <div>
            <PrintersDataGridFunctionality rows={rows} locationList={locations}/>
        </div>
    )
}

export default FetchPrintersDataGrid;