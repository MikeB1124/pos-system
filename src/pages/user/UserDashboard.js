import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import socket from '../../socketConfig'
import AppIcon from '../../components/user/AppIcon'

function UserDashboard(){
    const [data, setData] = useState({})
    const groupID = localStorage.getItem('groupID');

    useEffect(() => {
        socket.on('display-item', (item) => {
            setData(item)
        })
    }, [socket])

    useEffect(() => {
        socket.emit('join-room', groupID)
    }, [])

    

    return (
        <div>
            {/* <h1>{data.meal}</h1>
            <h2>{data.title}  ${data.price}</h2>
            <img src={data.image}></img>
            <h3>{data.description}</h3> */}
            <div style={headerContainer}>
                <h1 style={headerStyle}>Resaurant Central Apps</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <AppIcon title={"Daily Special's Board"} img={"https://images-platform.99static.com//aufFOWBrXYOOZAzgQhR-buEv0KQ=/236x63:895x722/fit-in/590x590/99designs-contests-attachments/53/53255/attachment_53255918"}/>
                <AppIcon title={"Customer Kiosk"} img={"https://seeklogo.com/images/K/Kiosk-logo-4948545415-seeklogo.com.gif"}/>
                <AppIcon title={"POS Central"} img={"https://dcassetcdn.com/design_img/3987175/838431/27840556/a9qgtnr1h8321t4afggmzbxpk0_image.jpg"}/>
                <AppIcon title={"Financial Reports"} img={"https://thumbs.dreamstime.com/b/business-report-icon-isolated-white-background-business-report-icon-isolated-white-background-simple-vector-logo-171651784.jpg"}/>
            </div>
            
        </div>
    );
}

export default UserDashboard;



const headerContainer = {
    display: 'flex', 
    justifyContent: 'center',
    marginTop: '30px'
}

const headerStyle = {
    fontFamily: "Montserrat",
    textAlign: 'center',
    fontSize: '50px'
}

