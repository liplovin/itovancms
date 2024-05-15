import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [duplicateError, setDuplicateError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        let formErrors = {};

        if (!inputs.firstName) formErrors.firstName = "First Name is required";
        if (!inputs.lastName) formErrors.lastName = "Last Name is required";
        if (!inputs.username) formErrors.username = "Username is required";
        if (!inputs.email) formErrors.email = "Email is required";
        if (!inputs.password) formErrors.password = "Password is required";
        if (!inputs.confirmPassword) formErrors.confirmPassword = "Confirm Password is required";

        if (inputs.password !== inputs.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost/PROJECT/backend/index.php', inputs);
            console.log(response.data);
            history.push('/signin');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setDuplicateError(error.response.data.error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <section className="form__section">
            <div className="container form__section-container">
                <h2>Sign Up</h2>
                {duplicateError && <div className="alert__message error"><p>{duplicateError}</p></div>}
                {submitted && Object.values(errors).map((error, index) => (
                    <div key={index} className="alert__message error"><p>{error}</p></div>
                ))}
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="First Name" 
                        value={inputs.firstName} 
                        onChange={handleInputChange} 
                        className={submitted && errors.firstName ? 'error' : ''}
                    />
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last Name" 
                        value={inputs.lastName} 
                        onChange={handleInputChange} 
                        className={submitted && errors.lastName ? 'error' : ''}
                    />
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={inputs.username} 
                        onChange={handleInputChange} 
                        className={submitted && errors.username ? 'error' : ''}
                    />
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        value={inputs.email} 
                        onChange={handleInputChange} 
                        className={submitted && errors.email ? 'error' : ''}
                    />
                    <div className="form password-input">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="password" 
                            placeholder="Create Password" 
                            value={inputs.password} 
                            onChange={handleInputChange} 
                            className={submitted && errors.password ? 'error' : ''}
                        />
                        
                    </div>
                    <div className="form password-input">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="confirmPassword" 
                            placeholder="Confirm Password" 
                            value={inputs.confirmPassword} 
                            onChange={handleInputChange} 
                            className={submitted && errors.confirmPassword ? 'error' : ''}
                        />
                       
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <small>Already have an account? <Link to="/signin">Sign In</Link></small>
                </form>
            </div>
        </section>
    );
}

export default Signup;
