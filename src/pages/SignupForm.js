import React from "react";
import { createUser } from '../services';
import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import {getUsers} from '../services'
import PasswordChecklist from "react-password-checklist"


import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Alert
} from "reactstrap";

const SignupForm = () => {
    let navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [groupID, setGroupID] = useState('');
    const [groupidFound, setGroupidFound] = useState(null);
    const [usernameFound, setUsernameFound] = useState(null);
    const [bannerFailAlert, setBannerFailAlert] = useState(false);
    const [bannerSuccessAlert, setBannerSuccessAlert] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        validateSignup();
    }

    function validateSignup(){
        const user = {
            role: "client",
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            companyName: company,
            groupID: groupID
        }

        const promise = getUsers();

        promise.then((users) => {
            users.filter((user) => {
                if(user.groupID == groupID && user.role == "admin"){
                    setGroupidFound(true);
                }
                if(user.username == username){
                    setUsernameFound(true);
                }
            });

            if(groupidFound && !usernameFound){
                createUser(user)
                .then(()=>{
                    
                });
                accountCreatedSuccessfully();
                navigate('/login');
            }else{
                invalidInput();
            }
        });

    }

    function invalidInput(){
        setBannerFailAlert(true);

        setTimeout(() => {
            setBannerFailAlert(false);
        }, 3000)
    }

    function accountCreatedSuccessfully(){
        setBannerFailAlert(true);

        setTimeout(() => {
            setBannerFailAlert(false);
        }, 3000)
    }
    

  return (
    <>
    {bannerFailAlert && <Alert color="danger">Username already taken or GroupID does not exist</Alert>}
    {bannerSuccessAlert && <Alert color="success">Account was sucessfully created</Alert>}
      <Card>
        <CardBody>
            <h2>Signup To POS Central</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-row">
              <FormGroup className="col-md-6">
                <Label>First Name</Label>
                <Input type="text" placeholder="First Name" 
                    onChange={event => setFirstName(event.target.value)} value={firstName}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label>Last Name</Label>
                <Input type="text" placeholder="Last Name" autoComplete="off"
                    onChange={event => setLastName(event.target.value)} value={lastName}
                />
              </FormGroup>
            </div>

            <div className="form-row">
              <FormGroup className="col-md-6">
                <Label>Username</Label>
                <Input name="requiredField" type="text" placeholder="Username"
                    onChange={event => setUsername(event.target.value)} value={username}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label>Password</Label>
                <Input type="password" placeholder="Password" autoComplete="off"
                    onChange={event => setPassword(event.target.value)} value={password}
                />
                <PasswordChecklist
				rules={["minLength","number","capital"]}
				minLength={5}
				value={password}
				onChange={(isValid) => {}}
			/>
              </FormGroup>
            </div>

            <div className="form-row">
                <FormGroup className="col-md-6">
                    <Label>Group id</Label>
                    <Input type="number" placeholder="6-digit groupId"
                        onChange={event => setGroupID(event.target.value)} value={groupID}
                    />
                </FormGroup>
                <FormGroup className="col-md-6">
                <Label>Company</Label>
                <Input type="text" placeholder="Company Name"
                    onChange={event => setCompany(event.target.value)} value={company}
                />
                </FormGroup>
            </div>
            <Button type="submit" color="primary">Signup</Button>
          </form>
          <Link to="/login">Already have an account? Login Here</Link> 
        </CardBody>
      </Card>
    </>
  );
};

export default SignupForm;