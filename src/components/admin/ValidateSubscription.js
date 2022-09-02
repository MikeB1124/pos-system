import PricingCard from './PricingCard'
import AddLocationPage from './AddLocationPage'
import FetchLocationInfo from './FetchLocationInfo'
import { useState, useEffect } from 'react'
import {getUsers, updateSubscriptionStatus} from '../../userServices'
import CircularProgress from '@mui/material/CircularProgress';

function ValidateSubscription(props){
    
    function checkoutSession(){
        fetch("https://trimana-pos-backend-stg.herokuapp.com/create-checkout-session", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            if(res.ok){
                return res.json()
            }
            return res.json().then(json => Promise.reject(json))
        }).then(({url}) => {
            window.location = url
        }).catch(e => {
            console.error(e.error)
        })
    }
    return (
        <div style={divStyles}>
            {props.subscriptionStatus == null ? <CircularProgress style={{color: "white"}}/> : !props.subscriptionStatus ? <PricingCard buttonClick={checkoutSession}/> : <FetchLocationInfo/>}
            {/* {!props.subscriptionStatus ? <PricingCard buttonClick={checkoutSession}/> : <FetchLocationInfo/>} */}
        </div>
    );
}

export default ValidateSubscription;

const divStyles = {
    marginLeft: '18vw', 
    backgroundColor:"white", 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    background: "linear-gradient(159.02deg,#202458 14.25%,#0c1458 56.45%,#010931 86.14%)"
}