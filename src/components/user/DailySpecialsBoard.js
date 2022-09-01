import {useEffect, useState} from 'react'
import { getMenuItems } from '../../menuServices';
import SpecialBoards from './SpecialBoards'
import socket from '../../socketConfig'
import _ from 'lodash';

function DailySpecialsBoard(){
    const groupID = localStorage.getItem('groupID')
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [counter, setCounter] = useState(0)
    

    function checkDuplicateItems(item){
        for(let i = 0; i < items.length; i++){
            if(item.menuId == items[i].menuId){
                return true;
            }
        }
        return false;
    }

    function checkDuplicateCategory(category){
        for(let i = 0; i < categories.length; i++){
            if(category === categories[i]){
                return true;
            }
        }
        return false;
    }



    useEffect(() => {
        socket.on('display-item', (item) => {
            window.location.reload()
        })

    }, [socket])

    useEffect(() => {
        socket.emit('join-room', groupID)
        
    }, [])
    
    const regex = /special/
        

        getMenuItems().then(menuItems => {
            menuItems.forEach(menuItem => {
                if(regex.test(menuItem.meal.toLowerCase()) && menuItem.groupId == groupID){
                    const category = menuItem.meal
                    if(!checkDuplicateItems(menuItem)){
                        setItems([...items, menuItem])
                    }

                    if(!checkDuplicateCategory(category)){
                        setCategories([...categories, category])
                    }
                    
                }
            })
        })
    

        
            
    return(
        <div style={{backgroundColor: '#f1f5f8'}}>
            <SpecialBoards menuItems={items} menuCategories={categories}/>
        </div>
    )
}

export default DailySpecialsBoard;