import {useState} from 'react';
import {useNavigate, Link, Router} from "react-router-dom";
import {userValidate} from '../validate'
import {getUsers} from '../services'
import Input from '../components/Input.js'
import '../styles/input.scss';

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        
        const promise = getUsers();
    
        const validateUsers = () => {
            promise.then((users) => {
                let found = 0;
                users.filter(element => {
                    if(element.username === username && element.password === password){
                        found = found + 1;
                    }
                })
                if(found == 1){
                    navigate('/userdashboard');
                }else{
                    navigate('/error');
                }
            })
        }

        validateUsers();
    }


    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h1>Login POS System</h1>
                <Input placeholder="Username" type="text" onChange={event => setUsername(event.target.value)} value={username}/>
                <Input placeholder="Password" type="password" onChange={event => setPassword(event.target.value)} value={password}/>
                <button type="submit">Submit</button>
                <Link to="/signup">Not a member? Sign Up Here</Link>     
            </form>                
        </div>
    );
}

export default Login;