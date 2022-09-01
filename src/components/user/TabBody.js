import TabPanel from '@mui/lab/TabPanel';
import SpecialItem from './SpecialItem'

function TabBody(props){
    
    function getSpecialsItems(special, menuItems){
        let arr = []
        for(let j = 0; j < menuItems.length; j++){
            if(menuItems[j].meal === special){
                arr.push(
                    <SpecialItem key={j} item={menuItems[j]}/>
                )
            }
        }
        
        return arr;
    }

    return(
        <div>
            
            <TabPanel style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} key={props.index} value={`${props.index}`}>
                <h1 style={{color: 'black', width: '100%', textAlign: 'center', fontSize: '75px'}}>{props.specials}'s</h1>
                {getSpecialsItems(props.specials, props.menuItems)}
            </TabPanel>
        </div>
    )
}

export default TabBody;