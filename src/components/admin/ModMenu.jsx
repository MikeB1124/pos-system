import {useMemo, useCallback, useState, useEffect} from 'react';
import { Grid, Button, Box, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Table} from "reactstrap";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from '../../menuServices';
import { Row, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import {groupID} from '../../globalValues.js'


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';



var Rows = [];

const addOnList = [
'avocado',
'cheese',
'bacon',
'onion',
];


function ModMenu(){
const [openAddModal, setOpenAddModal] = useState(false);
const [openUpdateModal, setOpenUpdateModal] = useState(false);
const [addOns, setAddOns] = useState([]);

const [meal, setMeal] = useState('');
const [itemTitle, setItemTitle] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [img, setImg] = useState('');

const[updateObjectId, setUpdateObjectId] = useState('');
const [updateMeal, setUpdateMeal] = useState('');
const [updateItemTitle, setUpdateItemTitle] = useState('');
const [updateDescription, setUpdateDescription] = useState('');
const [updateAddOns, setUpdateAddOns] = useState([]);
const [updatePrice, setUpdatePrice] = useState('');
const [updateImg, setUpdateImg] = useState('');

const[deleteObjectId, setDeleteObjectId] = useState('');

const [rows, setRows] = useState(Rows);

const deleteItem = useCallback(
    (id) => () => {
        setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        getMenuItems().then((items) => {
            items.forEach((item) =>{
               if(item.groupId == groupID && item.menuId == id){
                    setDeleteObjectId(item._id)
                    deleteMenuItem(deleteObjectId)
               }
            })
            }).catch((err) => console.log(err))
        });
    },
    [],);

const updateItem = useCallback(
    (id, meal, menuItem, price) => () => {
        setOpenUpdateModal(!openUpdateModal)
        getMenuItems().then((items) => {
            items.forEach((item) =>{
                console.log(groupID)
               if(item.groupId == groupID && item.menuId == id){
                    setUpdateObjectId(item._id)
                    setUpdateMeal(item.meal);
                    setUpdateItemTitle(item.title);
                    setUpdateDescription(item.description);
                    setUpdateAddOns(item.addOn);
                    setUpdateImg(item.image)
                    setUpdatePrice(item.price)
               }
            })
            }).catch((err) => console.log(err))
    },
    [],);


const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'meal', headerName: 'Meal', width: 130 },
    { field: 'menuItem', headerName: 'Menu Item', width: 130 },
    {field: 'price', headerName: 'Price', width:130},
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

const handleAddOnChange = (event) => {
    const {
    target: { value },
    } = event;
    setAddOns(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
    );
};

function addItem(){

    const data = {
    groupId: groupID,
    menuId: Math.floor(1000 + Math.random() * 9000),
    meal: meal,
    title: itemTitle,
    description: description,
    addOn: addOns,
    image: img,
    price: price
    };

    addMenuItem(data)
    console.log(img)
    handleAddModal()
}

function patchItem(){
    const data = {
        meal: updateMeal,
        title: updateItemTitle,
        description: updateDescription,
        addOn: updateAddOns,
        image: updateImg,
        price: updatePrice
        };
        console.log(data)

        updateMenuItem(updateObjectId, data)
        handleUpdateModal()
}


function refreshPage(){
    getMenuItems().then((items) => {
        items.forEach((item) =>{
            if(!checkDuplicate(item)){
                Rows = [...Rows, {id: item.menuId, meal: item.meal, menuItem: item.title, price: item.price}]
            }
        })
        }).catch((err) => console.log(err))
    
}

useEffect(() => {
    getMenuItems().then((items) => {
        items.forEach((item) =>{
            if(!checkDuplicate(item)){
                Rows = [...Rows, {id: item.menuId, meal: item.meal, menuItem: item.title, price: item.price}]
                console.log(rows)
            }
        })
        }).catch((err) => console.log(err))
}, [])

function checkDuplicate(item){
    for(let i = 0; i < Rows.length; i++){
        if(item.menuId == Rows[i].id){
            return true;
        }
    }
    return false;
}


    

return (
    <div style={{marginLeft: '18vw', backgroundColor:"white", height: '100vh'}}>
        <Button style={{margin: '5px'}} onClick={refreshPage}><RefreshIcon/></Button>   
        <Button style={{margin: '5px'}} color="success" variant="contained"  startIcon={<AddIcon />} onClick={handleAddModal}>
            Add Item
        </Button>


        <Modal isOpen={openAddModal} toggle={handleAddModal}>
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleAddModal}>
            <i className="tim-icons icon-simple-remove"></i>
            </button>
            <h3 className="modal-title">Add Menu Item</h3>
            </div>
            <ModalBody>
            <form>
                <div className="form-row">
                    <Col>
                        <InputLabel style={{color:'black'}}>Meal</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setMeal(event.target.value)} value={meal}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Menu Item</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setItemTitle(event.target.value)} value={itemTitle}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Description</InputLabel>
                        <Input style={{color: 'black'}} type="textarea" placeholder="" 
                        onChange={event => setDescription(event.target.value)} value={description}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Add On</InputLabel>
                        <Select
                            multiple
                            value={addOns}
                            onChange={handleAddOnChange}
                            
                            renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                <Chip key={value} label={value} />
                                ))}
                            </Box>
                            )}
                        >
                            {addOnList.map((addOn) => (
                                <MenuItem
                                key={addOn}
                                value={addOn}
                                >
                                {addOn}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Image Link</InputLabel>
                        <Input style={{color: 'black'}} type="text" onChange={event => setImg(event.target.value)} value={img}></Input>
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Price</InputLabel>
                        <Input style={{color: 'black'}} type="number" 
                        onChange={event => setPrice(event.target.value)} value={price}
                        />
                    </Col>
                </div>
            </form>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={handleAddModal}>
                Close
            </Button>
            <Button color="secondary" onClick={addItem}>
                Add
            </Button>
            </ModalFooter>
        </Modal>


        <Modal isOpen={openUpdateModal} toggle={handleUpdateModal}>
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleUpdateModal}>
            <i className="tim-icons icon-simple-remove"></i>
            </button>
            <h3 className="modal-title">Update Menu Item</h3>
            </div>
            <ModalBody>
            <form>
                <div className="form-row">
                    <Col>
                        <InputLabel style={{color:'black'}}>Meal</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setUpdateMeal(event.target.value)} value={updateMeal}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Menu Item</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setUpdateItemTitle(event.target.value)} value={updateItemTitle}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Description</InputLabel>
                        <Input style={{color: 'black'}} type="textarea" placeholder="" 
                        onChange={event => setUpdateDescription(event.target.value)} value={updateDescription}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Add On</InputLabel>
                        <Select
                            multiple
                            value={updateAddOns}
                            onChange={handleAddOnChange}
                            
                            renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                <Chip key={value} label={value} />
                                ))}
                            </Box>
                            )}
                        >
                            {addOnList.map((addOn) => (
                                <MenuItem
                                key={addOn}
                                value={addOn}
                                >
                                {addOn}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Image Link</InputLabel>
                        <Input style={{color: 'black'}} type="text" onChange={event => setUpdateImg(event.target.value)} value={updateImg}></Input>
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Price</InputLabel>
                        <Input style={{color: 'black'}} type="number" 
                        onChange={event => setUpdatePrice(event.target.value)} value={updatePrice}
                        />
                    </Col>
                </div>
            </form>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={handleUpdateModal}>
                Close
            </Button>
            <Button color="secondary" onClick={patchItem}>
                Update
            </Button>
            </ModalFooter>
        </Modal>


        <DataGrid autoHeight={true} 
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
    </div>
);
}

export default ModMenu;