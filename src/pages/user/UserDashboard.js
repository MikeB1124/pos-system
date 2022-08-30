import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import socket from '../../socketConfig'

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
            <h1>{data.meal}</h1>
            <h2>{data.title}  ${data.price}</h2>
            <img src={data.image}></img>
            <h3>{data.description}</h3>
            
        </div>
    );
}

export default UserDashboard;