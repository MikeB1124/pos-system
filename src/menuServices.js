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
