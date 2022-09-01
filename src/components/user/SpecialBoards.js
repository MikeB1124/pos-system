import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import {useState} from 'react'
import { useEffect } from 'react';
import TabBody from './TabBody'
import _ from 'lodash';
import {BrowserRouter, Routes} from 'react-router-dom'




function SpecialBoards(props){
    const [value, setValue] = useState('1');
    const [categories, setCategories] = useState({})
    const [fullScreen, setFullScreen] = useState(false)
    

    useEffect(() => {
        setCategories(props.menuCategories)
        setValue(localStorage.getItem('tabID'))
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('tabID', newValue)
    };

    

    function getTabs(count){
        let arr = [];
        let sortArr = props.menuCategories.sort() 
        for(let i = 0; i < count; i++){
            arr.push(<Tab style={{color:'#c59d5f', fontWeight: 'bold'}} label={sortArr[i]} key={i} value={`${i}`} />)
        }

        return arr
    }

    function getTabPannels(typesOfSpecials, typesOfMenuItems){
        
        let arr = [];
        let sortArr = typesOfSpecials.sort() 
        for(let i = 0; i < typesOfSpecials.length; i++){
            arr.push(
                <div>
                    <TabBody specials={typesOfSpecials[i]} menuItems={typesOfMenuItems} key={i} index={i} />
                </div>
            )
        }
        
        return arr
    }

    function handleMovement(event){
        console.log(event)
        if(window.innerHeight == window.screen.height){
            setFullScreen(true)
        }else{
            setFullScreen(false)
        }
    }
   
    return(
        <div style={{height: '100vh'}} onMouseMove={handleMovement}>
            <Box  sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        {!fullScreen ? 
                        <TabList style={{backgroundColor: 'black'}} initialSelectedIndex={1}  centered onChange={handleChange} aria-label="lab API tabs example">
                            {getTabs(props.menuCategories.length)}
                        </TabList> 
                        : <div></div>}
                    </Box>
                    
                        {getTabPannels(props.menuCategories, props.menuItems)}
                </TabContext>
            </Box>
        </div>
    )
}

export default SpecialBoards;