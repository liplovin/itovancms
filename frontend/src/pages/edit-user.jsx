import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
    const { id } = useParams(); // Extracting user ID from URL params
    const [userData, setUserData] = useState({ firstName: '', lastName: '', role: '0' }); // Assuming '0' represents 'Author' role initially
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost/PROJECT/backend/getUser.php?id=${id}`);
                const userDataFromApi = response.data;
                setUserData(userDataFromApi);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost/PROJECT/backend/editUser.php`, {
                id: id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                role: userData.role
            });
            console.log(response.data);
            setSuccessMessage('User data updated successfully');
            // Handle success message or redirection if needed
        } catch (error) {
            console.error('Error updating user data:', error);
            // Handle error message
        }
    };

    return (
        <section className="form__section">
            <div className="container form__section-container">
                <h2>Edit User</h2>
                {successMessage && <p className="alert__message success">{successMessage}</p>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                    />
                    <select name="role" value={userData.role} onChange={handleChange}>
                        <option value="0">Author</option>
                        <option value="1">Admin</option>
                    </select>

                    <button type="submit" className="btn">Update User</button>
                </form>
            </div>
        </section>
    );
}

export default EditUser;
