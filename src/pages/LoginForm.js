import React from "react";
import '../styles/black-dashboard-react.css'
import {useState, useEffect} from 'react';
import {useNavigate, Link, Router} from "react-router-dom";
import {getUsers} from '../userServices'
import {initializeAdminInfo} from '../globalValues'


import {
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
  Button,
  Card,
  CardBody
} from "reactstrap";

const LoginForm = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [userFound, setUserFound] = useState(false);
  const [bannerFailAlert, setBannerFailAlert] = useState(false);
  let userFound = false;
  let isAdmin = false;


  
  const handleSubmit = event => {
    event.preventDefault();
    validateLogin();
}

function validateLogin(){
  const promise = getUsers();

  promise.then((users) => {
    users.filter(user => {
      if(user.username === username && user.password === password){
        userFound = true;
        initializeAdminInfo(user.groupID);
        localStorage.setItem('groupID', user.groupID);
        if(user.role === "admin"){
          isAdmin = true;
        }
      }
    });
    
    if(userFound){
      if(isAdmin){
        navigate('/admin-dashboard')
      }else{
        navigate('/user-dashboard');
      }
    }else{
        invalidInput()
    }
  });
  
}

function invalidInput(){
  setBannerFailAlert(true);

  setTimeout(() => {
      setBannerFailAlert(false);
  }, 3000)
}

  return (
    <>
    {bannerFailAlert && <Alert color="danger">Username or password was incorrect</Alert>}
    <Card style={{display:'flex', justifyContent:'center'}}>
      <CardBody>
      <h2>Login To POS Central</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Enter username"
              onChange={event => setUsername(event.target.value)} value={username}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={event => setPassword(event.target.value)} value={password}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
    </>
  );
};

export default LoginForm;