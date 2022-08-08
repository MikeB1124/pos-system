import {getUsers, updatePrinterIP} from './userServices'

export var groupID;
export var printer;

export function initializePrinter(groupid, ip, username, password){
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


export function initializeAdminInfo(groupid, ip){
    groupID= groupid;
    printer = ip;
}