import {addPrinter, getPrinters, updatePrinter, deletePrinter} from '../../printerServices'
import {useCallback, useMemo, useState} from 'react'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Col, Input, Modal, ModalBody, ModalFooter } from "reactstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateUserPrinter, getUsers } from '../../userServices';


function PrintersDataGridFunctionality({rows, locationList}){
const groupID = localStorage.getItem('groupID');
const [openAddModal, setOpenAddModal] = useState(false);
const [openUpdateModal, setOpenUpdateModal] = useState(false);


const [printerName, setPrinterName] = useState('');
const [ssID, setSSID] = useState('');
const [ipAddress, setIpAddress] = useState('');
const [storeLocation, setStoreLocation] = useState('');

const[updateObjectId, setUpdateObjectId] = useState('');
const [updatePrinterName, setUpdatePrinterName] = useState('');
const [updateSSID, setUpdateSSID] = useState('');
const [updateIpAddress, setUpdateIpAddress] = useState('');
const [updateStoreLocation, setUpdateStoreLocation] = useState('');




const deleteItem = useCallback(
    (id) => () => {
        setTimeout(() => {
        getPrinters().then((printers) => {
            printers.forEach((printer) =>{
               if(printer.groupID == groupID && printer.printerID == id){
                    deleteUserPrinter(id)
                    deletePrinter(printer._id)
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000)
               }
            })
            }).catch((err) => console.log(err))
        });
    },
    [],);

const updateItem = useCallback(
    (id) => () => {
        setOpenUpdateModal(!openUpdateModal)
        getPrinters().then((printers) => {
            printers.forEach((printer) =>{
               if(printer.groupID == groupID && printer.printerID == id){
                    setUpdateObjectId(printer._id)
                    setUpdatePrinterName(printer.printerName);
                    setUpdateSSID(printer.ssID);
                    setUpdateIpAddress(printer.ipAddress);
                    setUpdateStoreLocation(printer.storeLocation);
               }
            })
            }).catch((err) => console.log(err))
    },
    [],);

const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'printerName', headerName: 'Printer Name', width: 130 },
    { field: 'ssID', headerName: 'SSID', width: 130 },
    {field: 'ipAddress', headerName: 'IP Address', width:130},
    {field: 'storeLocation', headerName: 'Store Location', width:130},
    {
        field: 'edit',
        type: 'actions',
        width: 80,
        getActions: (params) => [
        <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={updateItem(params.id)}
        />,
        ]
    },
    {
        field: 'delete',
        type: 'actions',
        width: 80,
        getActions: (params) => [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteItem(params.id)}
        />,
        ]
    }
], [deleteItem], [updateItem])


function handleAddModal(){
    setOpenAddModal(!openAddModal);
}

function handleUpdateModal(){
    setOpenUpdateModal(!openUpdateModal);
}
function deleteUserPrinter(id){
    let printerObjectID;

    getPrinters().then((printers) => {
        printers.filter(printer => {
            if(printer.groupID == groupID && printer.printerID === id){
                printerObjectID = printer._id

                const promise = getUsers();

                promise.then((users) => {
                    
                    users.filter(user => {
                    if(user.groupID == groupID && user.role === "admin"){
                        updateUserPrinter(user._id, printerObjectID, "delete")
                        
                    }else if(user.groupID == groupID && user.role === "client" && user.street === storeLocation){
                        updateUserPrinter(user._id, printerObjectID, "delete")
                    }
                    });
                });
            }
        })
    })


    
}

function addUserPrinter(){
    let printerObjectID;
    console.log("here")
    getPrinters().then((printers) => {
        printers.forEach(printer => {
            console.log(printer.groupID, groupID)
            console.log(printer.storeLocation, storeLocation)
            console.log(printer.ipAddress, ipAddress)
            if(printer.groupID == groupID && printer.storeLocation === storeLocation && printer.ipAddress === ipAddress){
                printerObjectID = printer._id
                const promise = getUsers();
                promise.then((users) => {
        
                    users.forEach(user => {
                    if(user.groupID == groupID && user.role === "admin"){
                        updateUserPrinter(user._id, printerObjectID, "add")
                        
                    }else if(user.groupID == groupID && user.role === "client" && user.street === storeLocation){
                        updateUserPrinter(user._id, printerObjectID, "add")
                    }
                    });
                });
            }
        })
    })

    

    
}


function addPrinterItem(){
    
    const printer = {
    groupID: groupID,
    printerID: Math.floor(1000 + Math.random() * 9000),
    printerName: printerName,
    ssID: ssID,
    ipAddress: ipAddress,
    storeLocation: storeLocation,
    };

    
    

    addPrinter(printer)
    addUserPrinter()
    handleAddModal()
    setTimeout(() => {
        window.location.reload()
    }, 3000)
}

function patchPrinterItem(){
    const printer = {
        printerName: updatePrinterName,
        ssID: updateSSID,
        ipAddress: updateIpAddress,
        storeLocation: updateStoreLocation,
        };
        console.log(printer)


        updatePrinter(updateObjectId, printer)
        handleUpdateModal()
        window.location.reload()
}


function refreshPage(){
    window.location.reload()
}
    return(
        <div style={{marginLeft: '18vw', backgroundColor:"white", height: '100vh'}}>
            <Button style={{margin: '5px'}} onClick={refreshPage}><RefreshIcon/></Button>   
            <Button style={{margin: '5px'}} color="success" variant="contained"  startIcon={<AddIcon />} onClick={handleAddModal}>
                Add Printer
            </Button>


            <Modal isOpen={openAddModal} toggle={handleAddModal}>
                <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleAddModal}>
                <i className="tim-icons icon-simple-remove"></i>
                </button>
                <h3 className="modal-title">Add Printer</h3>
                </div>
                <ModalBody>
                <form>
                    <div className="form-row">
                        <Col>
                            <InputLabel style={{color:'black'}}>Printer Name</InputLabel>
                            <Input style={{color: 'black'}} type="text" 
                            onChange={event => setPrinterName(event.target.value)} value={printerName}
                            />
                        </Col>
                        <Col>
                            <InputLabel style={{color:'black'}}>SSID</InputLabel>
                            <Input style={{color: 'black'}} type="text" 
                            onChange={event => setSSID(event.target.value)} value={ssID}
                            />
                        </Col>
                    </div>
                    <div className="form-row" style={{marginTop: '10px'}}>
                        <Col>
                            <InputLabel style={{color:'black'}}>IP Address</InputLabel>
                            <Input style={{color: 'black'}} type="text" placeholder="" 
                            onChange={event => setIpAddress(event.target.value)} value={ipAddress}
                            />
                        </Col>
                    </div>
                    <div className="form-row" style={{marginTop: '10px'}}>
                        <Col>
                            <FormControl fullWidth>
                                <InputLabel>Store Location</InputLabel>
                                <Select
                                    value={storeLocation}
                                    label="Store Location"
                                    onChange={event => setStoreLocation(event.target.value)}
                                >
                                    {locationList.map((location) => (
                                    <MenuItem
                                    key={location}
                                    value={location}
                                    >
                                    {location}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Col>
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={handleAddModal}>
                    Close
                </Button>
                <Button color="secondary" onClick={addPrinterItem}>
                    Add
                </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={openUpdateModal} toggle={handleUpdateModal}>
                <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleUpdateModal}>
                <i className="tim-icons icon-simple-remove"></i>
                </button>
                <h3 className="modal-title">Update Printer</h3>
                </div>
                <ModalBody>
                <form>
                    <div className="form-row">
                        <Col>
                            <InputLabel style={{color:'black'}}>Printer Name</InputLabel>
                            <Input style={{color: 'black'}} type="text" 
                            onChange={event => setUpdatePrinterName(event.target.value)} value={updatePrinterName}
                            />
                        </Col>
                        <Col>
                            <InputLabel style={{color:'black'}}>SSID</InputLabel>
                            <Input style={{color: 'black'}} type="text" 
                            onChange={event => setUpdateSSID(event.target.value)} value={updateSSID}
                            />
                        </Col>
                    </div>
                    <div className="form-row" style={{marginTop: '10px'}}>
                        <Col>
                            <InputLabel style={{color:'black'}}>IP Address</InputLabel>
                            <Input style={{color: 'black'}} type="text" placeholder="" 
                            onChange={event => setUpdateIpAddress(event.target.value)} value={updateIpAddress}
                            />
                        </Col>
                    </div>
                    <div className="form-row" style={{marginTop: '10px'}}>
                        <Col>
                            <FormControl fullWidth>
                                <InputLabel>Store Location</InputLabel>
                                <Select
                                    value={updateStoreLocation}
                                    label="Store Location"
                                    onChange={event => setUpdateStoreLocation(event.target.value)}
                                >
                                    {locationList.map((location) => (
                                    <MenuItem
                                    key={location}
                                    value={location}
                                    >
                                    {location}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Col>
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={handleUpdateModal}>
                    Close
                </Button>
                <Button color="secondary" onClick={patchPrinterItem}>
                    Update
                </Button>
                </ModalFooter>
            </Modal>


            <DataGrid autoHeight={true} 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            />
        </div>
    )
}

export default PrintersDataGridFunctionality;