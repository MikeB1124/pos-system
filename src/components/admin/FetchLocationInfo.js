import {useEffect, useState} from 'react'
import {getUsers, updateLocation} from '../../userServices'
import {getPrinters} from '../../printerServices'
import AddLocationPage from './AddLocationPage'

function FetchLocationInfo(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const groupID = localStorage.getItem('groupID')
    const [company, setCompany] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [numLocations, setNumLocations] = useState(null)
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [state, setState] = useState("")
    const [printersObjectID, setPrintersObjectID] = useState([])
    const [printers, setPrinters] = useState([])
    const [printersDisplay, setPrintersDisplay] = useState([])
    const [updateObjectID, setUpdateObjectID] = useState("")
    const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false)
    

    useEffect(() => {
        const promise = getUsers();
        
    promise.then((users) => {
        
        users.filter(user => {
            if(user.groupID == groupID && user.role === "client"){
                setNumLocations(true)
                setUsername(user.username)
                setPassword(user.password)
                setCompany(user.company)
                setPhone(user.phoneNumber)
                setStreet(user.street)
                setCity(user.city)
                setPostalCode(user.postalCode)
                setState(user.state)
                setAddress(`${user.street}, ${user.city} ${user.state} ${user.postalCode}`)
                setUpdateObjectID(user._id)
                for(let i = 0; i < user.printers.length; i++){
                    if(!checkDuplicateID(user.printers[i])){
                        setPrintersObjectID(prevState => ([...prevState, user.printers[i]]))
                    }
                }
            }else{
                setNumLocations(false)
            }

            if(user.groupID == groupID && user.role === "admin"){
                setCancelAtPeriodEnd(user.cancel_at_period_end)
            }
            });
        });
        
        getPrinters().then((printerDevices) => {
            printerDevices.forEach(printer => {
                for(let i = 0; i < printersObjectID.length; i++){
                    if(!checkDuplicatePrinter(printer) && printer._id == printersObjectID[i]){
                        setPrinters(prevState => ([...prevState, {printerName: printer.printerName, printerIP: printer.ipAddress}]))
                        setPrintersDisplay((prevState) => ([...prevState, `${printer.ipAddress} (${printer.printerName}),  `]))
                    }
                }
            })
        })



    }, [printersObjectID])
    

    function checkDuplicateID(printerID){
        for(let i = 0; i < printersObjectID.length; i++){
            if(printerID == printersObjectID[i]){
                return true;
            }
        }
        return false;
    }

    function checkDuplicatePrinter(printer){
        for(let i = 0; i < printers.length; i++){
            if(printer.ipAddress == printers[i].printerIP){
                return true;
            }
        }
        return false;
    }

    
    
    return(
        <AddLocationPage 
        groupId={groupID} 
        username={username} 
        password={password} 
        company={company}
        phone={phone}
        printers={printersDisplay}
        street={street}
        city={city}
        postalCode={postalCode}
        state={state}
        address={address}
        numLocations={numLocations}
        cancelAtPeriodEnd={cancelAtPeriodEnd}
        objectID={updateObjectID}
        />
    )
}

export default FetchLocationInfo;