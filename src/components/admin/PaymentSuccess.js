import { IoIosCheckmarkCircle } from 'react-icons/io';
import { updateSubscriptionStatus, getUsers, updateLocation } from '../../userServices'
import {Link} from "react-router-dom";

function PaymentSuccess(){
    const groupID = localStorage.getItem('groupID')
    const queryParams = new URLSearchParams(window.location.search)
    const session_id = queryParams.get("session_id")

    function fetchSession(){

        fetch(`https://trimana-pos-backend-stg.herokuapp.com/payment-success?session_id=${session_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }).then(response => response.json()).then(status => {
            const promise = getUsers();
            promise.then((users) => {
                users.filter(user => {
                if(user.groupID == groupID && user.role === "admin"){
                    updateSubscriptionStatus(user._id, status)
                    updateLocation(user._id, {session_id: session_id})
                   setTimeout(() => {
                        window.location = "https://trimana-pos-frontend-stg.herokuapp.com/admin-dashboard/locations"
                   }, 5000)
                   
                }
                });
            });
        }).catch(e => console.log(e.message));

    }

    fetchSession()

    return(
        <div>
            <div style={{backgroundColor: 'white', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <IoIosCheckmarkCircle style={{width: '200px', height: '200px', color: 'green'}}/>
                    <h1 style={{color: "black"}}>Subscribed Successfully</h1>
                    <h1 style={{color: "black"}}>{session_id}</h1>
                    <h3 style={{color: "black"}}>Will Be Redirected in 5 seconds or <Link to='/admin-dashboard/locations'>Click Here</Link></h3>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess;