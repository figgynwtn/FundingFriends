import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { APIURLContext } from 'src/contexts/APIURLContext';
import useToken from 'src/hooks/useToken';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';

export default function LoginForm() {
    const [inputs, setInputs] = useState({});
    const apiURL = useContext(APIURLContext);
    const {token, setToken} = useToken();
    const navigate = useNavigate();

    if (token) {
        return <Navigate replace to='/login/profile' />
    }

    async function loginUser(credentials) {
        try {
            let res = await axios.post(apiURL + '/users/login', credentials);
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({...values, [fieldName]: fieldValue}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let loginCredentials = {};
        loginCredentials.email = inputs.email;
        loginCredentials.password = inputs.password;
        const loginResponse = await loginUser(loginCredentials);
        if(loginResponse == null) {
            alert('The username and password is invalid. Please try again!');
        } else {
            setToken(loginResponse.accessToken);
            navigate('/login/profile', { state: { userInputs: inputs } });
        }
    }

    return(
        <div className="login-form">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address:</label>
                    <input type="text" name='email' value={inputs.email||""} placeholder='Enter your email' onChange={handleChange} id="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Password:</label>
                    <input type="password" name='password' placeholder='Enter your password' value={inputs.password||""} onChange={handleChange} id="password" className="form-control" />
                </div>
                <button type='submit' className='btn btn-primary'>LOGIN</button>
            </form>
        </div>
    );
}