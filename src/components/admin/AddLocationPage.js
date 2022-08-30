import {Badge, Button, Box} from '@mui/material';
import { Row, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import {AiOutlinePlus} from 'react-icons/ai'
import {useState} from 'react'
import {createUser, deleteUser, updateLocation} from '../../userServices'
import {cancelSubscriptionPortal} from '../../stripeServices'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import LocationCard from './LocationCard';
import CircularProgress from '@mui/material/CircularProgress';

function AddLocationPage(props){
    const [addLocationModal, setAddLocationModal] = useState(false);
    const [editAddLocationModal, setEditAddLocationModal] = useState(false);
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const groupID = localStorage.getItem('groupID')
    const [company, setCompany] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [state, setState] = useState("")
    const [phone, setPhone] = useState("")

    const [editUsername, setEditUsername] = useState("")
    const [editPassword, setEditPassword] = useState("")
    const [editCompany, setEditCompany] = useState("")
    const [editStreet, setEditStreet] = useState("")
    const [editCity, setEditCity] = useState("")
    const [editPostalCode, setEditPostalCode] = useState("")
    const [editState, setEditState] = useState("")
    const [editPhone, setEditPhone] = useState("")
    
    function handleAddLocationModal(){
        setAddLocationModal(!addLocationModal)
        
    }

    function handleEditAddLocationModal(){
        setEditAddLocationModal(!editAddLocationModal)
        if(!editAddLocationModal){
            setEditUsername(props.username)
            setEditPassword(props.password)
            setEditCompany(props.company)
            setEditStreet(props.street)
            setEditCity(props.city)
            setEditPostalCode(props.postalCode)
            setEditState(props.state)
            setEditPhone(props.phone)
        }
    }

    function handleCancelSubscription(){
        cancelSubscriptionPortal()
    }

    function addLocation(){
        const user = {
            role: "client",
            username: username,
            password: password,
            groupID: groupID,
            company: company,
            street: street,
            city: city,
            postalCode: postalCode,
            state: state,
            phoneNumber: phone
        };
        
    
        createUser(user)
        handleAddLocationModal()
        window.location.reload()
    }

    function patchLocation(){
        const location = {
            username: editUsername,
            password: editPassword,
            company: editCompany,
            street: editStreet,
            city: editCity,
            postalCode: editPostalCode,
            state: editState,
            phoneNumber: editPhone
        };
    
        updateLocation(props.objectID, location)
        handleEditAddLocationModal()
        window.location.reload()
    }

    function deleteLocation(){
        deleteUser(props.objectID)
        window.location.reload()
    }
    
    

    return(
        <div>
            {props.numLocations == null ? <CircularProgress style={{color:"white"}}/> : props.numLocations ? <LocationCard
                groupId={props.groupId} 
                username={props.username} 
                password={props.password} 
                company={props.company}
                phone={props.phone}
                printers={props.printers}
                address={props.address}
                editLocationButton={handleEditAddLocationModal}
                cancelSubscription={handleCancelSubscription}
                deleteLocation={deleteLocation}
            /> : <div><Button style={buttonStyle} onClick={handleAddLocationModal}><AiOutlinePlus style={additionIconStyle}/>Add Location</Button>
            <Button style={buttonStyle} onClick={handleCancelSubscription}>Manage Subscription</Button></div>}
            {props.cancelAtPeriodEnd ? <h3>Subscription will be inactive at end of period</h3> : <div></div>}

            <Modal isOpen={addLocationModal} toggle={handleAddLocationModal}>
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleAddLocationModal}>
            <i className="tim-icons icon-simple-remove"></i>
            </button>
            <h3 className="modal-title">Add Business Location</h3>
            </div>
            <ModalBody>
            <form>
                <div className="form-row">
                    <Col>
                        <InputLabel style={{color:'black'}}>Username</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setUsername(event.target.value)} value={username}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Password</InputLabel>
                        <Input style={{color: 'black'}} type="text"
                        onChange={event => setPassword(event.target.value)} value={password}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Company</InputLabel>
                        <Input style={{color: 'black'}} type="text"
                        onChange={event => setCompany(event.target.value)} value={company}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Street</InputLabel>
                        <Input style={{color: 'black'}} type="text"
                        onChange={event => setStreet(event.target.value)} value={street}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>City</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setCity(event.target.value)} value={city}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Postal Code</InputLabel>
                        <Input style={{color: 'black'}} type="number"
                        onChange={event => setPostalCode(event.target.value)} value={postalCode}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>State</InputLabel>
                        <Input style={{color: 'black'}} type="text" placeholder="Ex. CA, AL, etc" 
                        onChange={event => setState(event.target.value)} value={state}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Phone</InputLabel>
                        <Input style={{color: 'black'}} type="text" placeholder="10 Digit Phone Number" 
                        onChange={event => setPhone(event.target.value)} value={phone}
                        />
                    </Col>
                </div>
            </form>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={handleAddLocationModal}>
                Close
            </Button>
            <Button color="secondary" onClick={addLocation}>
                Add
            </Button>
            </ModalFooter>
        </Modal>



        <Modal isOpen={editAddLocationModal} toggle={handleEditAddLocationModal}>
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleEditAddLocationModal}>
            <i className="tim-icons icon-simple-remove"></i>
            </button>
            <h3 className="modal-title">Add Business Location</h3>
            </div>
            <ModalBody>
            <form>
                <div className="form-row">
                    <Col>
                        <InputLabel style={{color:'black'}}>Username</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setEditUsername(event.target.value)} value={editUsername}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Password</InputLabel>
                        <Input style={{color: 'black'}} type="text"
                        onChange={event => setEditPassword(event.target.value)} value={editPassword}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Company</InputLabel>
                        <Input style={{color: 'black'}} type="text"
                        onChange={event => setEditCompany(event.target.value)} value={editCompany}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>Street</InputLabel>
                        <Input style={{color: 'black'}} type="text"
                        onChange={event => setEditStreet(event.target.value)} value={editStreet}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>City</InputLabel>
                        <Input style={{color: 'black'}} type="text" 
                        onChange={event => setEditCity(event.target.value)} value={editCity}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Postal Code</InputLabel>
                        <Input style={{color: 'black'}} type="number"
                        onChange={event => setEditPostalCode(event.target.value)} value={editPostalCode}
                        />
                    </Col>
                </div>
                <div className="form-row" style={{marginTop: '10px'}}>
                    <Col>
                        <InputLabel style={{color:'black'}}>State</InputLabel>
                        <Input style={{color: 'black'}} type="text" placeholder="Ex. CA, AL, etc" 
                        onChange={event => setEditState(event.target.value)} value={editState}
                        />
                    </Col>
                    <Col>
                        <InputLabel style={{color:'black'}}>Phone</InputLabel>
                        <Input style={{color: 'black'}} type="text" placeholder="10 Digit Phone Number" 
                        onChange={event => setEditPhone(event.target.value)} value={editPhone}
                        />
                    </Col>
                </div>
            </form>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={handleEditAddLocationModal}>
                Close
            </Button>
            <Button color="secondary" onClick={patchLocation}>
                Update
            </Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}

export default AddLocationPage;

const buttonStyle = {
    posistion: "relative",
    boxSizing: "border-box",
    outline: "0",
    border: "0",
    marginTop: "10px",
    textDecoration: "none",
    fontFamily: "sans-serif",
    minWidth: "64px",
    width: "100%",
    backgroundColor: "#0075ff",
    color: "white"

}

const additionIconStyle =  {
    marginRight: '10px',
}