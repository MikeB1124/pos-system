import {getUsers, updatePrinterIP} from './services'

var groupID;
var printer;

export function getAdminInfo(groupid, ip, username, password){
    var objectID;
    groupID= groupid;
    printer = ip;

    const promise = getUsers();

    promise.then((users) => {
        users.filter((user) => {
            if(user.username == username && user.password == password){
                objectID = user._id;
            }
            
        });

        updatePrinterIP(objectID, printer)
    });

}