

export function userValidate(checkUsername, checkPassword){
    let found = 0;
    var users;
    
    const promise = fetch(`http://localhost:4000/users`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    }).then(res=>res.json())
    .then(data =>{
        return data
    })

    const searchUsers = () => {
        promise.then((users) => {
            users.filter(element => {
                if(element.username === checkUsername && element.password == checkPassword){
                    found = found + 1;
                }
            })
        })
    }

    searchUsers();


    //check if a user was found
    if(found == 1){
        return true;
    }else{
        return false;
    }
    
}
