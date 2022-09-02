import {getUsers} from '../src/userServices'

export async function cancelSubscriptionPortal(){
    const groupID = localStorage.getItem('groupID')
    const promise = getUsers();

    promise.then((users) => {
        users.forEach(user => {
            if(user.groupID == groupID && user.role === "admin"){
                fetch(`https://trimana-pos-central.herokuapp.com//customer-billing-info/${user.session_id}`, {
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
        });
    });
}


