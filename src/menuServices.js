export async function addMenuItem(item){
    fetch(`http://localhost:4000/add-menu-item`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(item)
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch(err=>{
            console.log('error',err)
        })
}

export async function getMenuItems(){
    return fetch(`http://localhost:4000/menu-items`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    }).then(res=>res.json())
    .then(data =>{
        return data
    })
}

export async function updateMenuItem(objectID, data){
 fetch(`http://localhost:4000//menu-item/${objectID}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch(err=>{
            console.log('error',err)
        })
}

export async function deleteMenuItem(objectID){
    fetch(`http://localhost:4000//delete-menu-item/${objectID}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch(err=>{
            console.log('error',err)
        })
}

