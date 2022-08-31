import ValidateSubscription from "./ValidateSubscription";
import {getUsers, updateLocation} from "../../userServices"
import {useState} from "react"

function ModLocations(){
    const groupID = localStorage.getItem('groupID')
    const [status, setStatus] = useState(null)
    
    const promise = getUsers();
    
    promise.then((users) => {
        users.filter(user => {
        if(user.groupID == groupID && user.role === "admin"){
            if(user.session_id != undefined){
                fetch(`https://trimana-pos-central.herokuapp.com/subscription-info/${user.session_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
                }).then(response => response.json()).then(status => {
                    setStatus(status.status)
                    updateLocation(user._id, status)
                }).catch(e => console.log(e.message));
            }else{
                setStatus(false)
            }
            
        }
        });
    });



    return(
        <ValidateSubscription subscriptionStatus={status}/>
    )
}

export default ModLocations;

