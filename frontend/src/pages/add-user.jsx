import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '0' // Default role value (Author)
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [duplicateError, setDuplicateError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        let formErrors = {};

        if (!formData.firstName) formErrors.firstName = "First Name is required";
        if (!formData.lastName) formErrors.lastName = "Last Name is required";
        if (!formData.username) formErrors.username = "Username is required";
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        if (!formData.confirmPassword) formErrors.confirmPassword = "Confirm Password is required";

        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost/PROJECT/backend/addUser.php', {
                ...formData,
                is_admin: formData.role === '1' ? 1 : 0 // Convert role to 1 if it's an admin, otherwise 0
            });
            console.log(response.data);
            setSuccessMessage("User created successfully"); // Set success message
            // Reset form after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '0'
            });
            setSubmitted(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setDuplicateError(error.response.data.error);
            }
        }
    };

    return (
        <section className="form__section">
            <div className="container form__section-container">
                <h2>Add User</h2>
                {submitted && Object.values(errors).map((error, index) => (
                    <div key={index} className="alert__message error"><p>{error}</p></div>
                ))}
                {duplicateError && <div className="alert__message error"><p>{duplicateError}</p></div>}
                {successMessage && <div className="alert__message success"><p>{successMessage}</p></div>} {/* Success message */}
                <form className='form' onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="0">Author</option>
                        <option value="1">Admin</option>
                    </select>
                    <button type="submit" className="btn">Add User</button>
                </form>
            </div>
        </section>
    );
}

export default AddUser;
