export async function createUser(user){
    fetch(`http://localhost:4000/add-user`,{
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
    return fetch(`http://localhost:4000/users`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    }).then(res=>res.json())
    .then(data =>{
        return data
    })
}

export async function updatePrinterIP(objectID, printer){
    fetch(`http://localhost:4000/user/${objectID}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                printerIP: printer
            })
        }).catch(err=>{
            console.log('error',err)
        })
}