import {useState} from 'react';
import { createUser } from '../services';
import Input from '../components/Input.js'
import '../styles/input.scss';




function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');

    const handleSubmit = event => {
        event.preventDefault()
        const user = {
            role: "client",
            firstName: `${firstName}`,
            lastName: `${lastName}`,
            email: `${email}`,
            username: `${username}`,
            password: `${password}`,
            companyName: `${company}`
        }

    

        createUser(user)
        .then(()=>{
            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setCompany('');
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h1>Sign up for POS System</h1>
                <Input placeholder="First Name" type="text" onChange={event => setFirstName(event.target.value)} value={firstName}/>
                <Input placeholder="Last Name" type="text" onChange={event => setLastName(event.target.value)} value={lastName}/>
                <Input placeholder="Email" type="email" onChange={event => setEmail(event.target.value)} value={email}/>
                <Input placeholder="Username" type="text" onChange={event => setUsername(event.target.value)} value={username}/>
                <Input placeholder="Password" type="password" onChange={event => setPassword(event.target.value)} value={password}/>
                <Input placeholder="Company" type="text" onChange={event => setCompany(event.target.value)} value={company}/>
                <button type="submit">Submit</button>
                <a>Already have an account? Login Here</a>      
            </form>                
        </div>        

    );
  }

export default Signup;



