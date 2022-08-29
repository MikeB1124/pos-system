import { useState, useEffect } from "react"
import MenuDataGridFunctionality from "./MenuDataGridFunctionality";
import { getMenuItems } from '../../menuServices';

function MenuDataGrid(){
    const groupID = localStorage.getItem('groupID');
    const [rows, setRowsTest] = useState([])
    const [forceRender, setForceRender] = useState(0)

    getMenuItems().then((items) => {
        items.forEach((item) =>{
            if(!checkDuplicate(item) && item.groupId == groupID){
                setRowsTest([...rows, {id: item.menuId, meal: item.meal, menuItem: item.title, price: item.price}])
            }
        })
        }).catch((err) => console.log(err))

        

    function checkDuplicate(item){
        for(let i = 0; i < rows.length; i++){
            if(item.menuId == rows[i].id){
                return true;
            }
        }
        return false;
    }

    function forceUpdate(){
        setForceRender(forceRender + 1)
    }

        

    return(
        <MenuDataGridFunctionality rows={rows} forceUpdate={forceUpdate} />
    );
}

export default MenuDataGrid;