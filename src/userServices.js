export async function createUser(user){
    fetch(`http://trimana-pos-central.herokuapp.com/add-user`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch(err=>{
            console.log('error',err)
        })
}


export async function getUsers(){
    return fetch(`http://trimana-pos-central.herokuapp.com/users`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    }).then(res=>res.json())
    .then(data =>{
        return data
    })
}

export async function updateSubscriptionStatus(objectID, status){
    fetch(`http://trimana-pos-central.herokuapp.com/user/${objectID}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                subscriptionStatus: status
            })
        }).then(res=> res.json()).then(status => console.log(status)).catch(err=>{
            console.log('error',err)
        })
}

export async function updateLocation(objectID, location){
    fetch(`http://trimana-pos-central.herokuapp.com/update-location/${objectID}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(location)
        }).then(res=> res.json()).then(status => console.log(status)).catch(err=>{
            console.log('error',err)
        })
}

export async function updateUserPrinter(objectID, printerObjectID, action){
    fetch(`http://trimana-pos-central.herokuapp.com/update-user-printers/${objectID}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                action: action,
                printer: printerObjectID
            })
        }).then(res=> res.json()).then(status => console.log(status)).catch(err=>{
            console.log('error',err)
        })
}

export async function deleteUser(objectID){
    fetch(`http://trimana-pos-central.herokuapp.com/delete-user/${objectID}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        }).then(res=> res.json()).then(status => console.log(status)).catch(err=>{
            console.log('error',err)
        })
}