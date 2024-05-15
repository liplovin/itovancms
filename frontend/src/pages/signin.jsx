// signin.js

import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../pages/AuthContext';

function Signin() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();
    const { login } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/PROJECT/backend/signin.php', inputs);
            console.log(response.data);

            if (response.data.success) {
                login(response.data.is_admin ? 'admin' : 'user', response.data.username); // Pass username
                if (response.data.is_admin) {
                    history.push('/admin/dashboard');
                } else {
                    history.push('/users/dashboard');
                }
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('AxiosError:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred while signing in.');
            }
        }
    };

    return (
        <section className="form__section">
            <div className="container form__section-container">
                <h2>Sign In</h2>
                {error && <div className="alert__message error"><p>{error}</p></div>}
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleInputChange} />
                    <button type="submit" className="btn">Sign In</button>
                    <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
                </form>
            </div>
        </section>
    );
}

export default Signin;
