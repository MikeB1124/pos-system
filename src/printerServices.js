export async function addPrinter(printer){
    fetch(`https://trimana-pos-central.herokuapp.com//add-printer`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(printer)
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch(err=>{
            console.log('error',err)
        })
}


export async function getPrinters(){
    return fetch(`https://trimana-pos-central.herokuapp.com//printers`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    }).then(res=>res.json())
    .then(data =>{
        return data
    })
}


export async function updatePrinter(objectID, data){
    fetch(`https://trimana-pos-central.herokuapp.com//printer/${objectID}`,{
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


export async function deletePrinter(objectID){
    fetch(`https://trimana-pos-central.herokuapp.com//delete-printer/${objectID}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        }).catch(err=>{
            console.log('error',err)
        })
}