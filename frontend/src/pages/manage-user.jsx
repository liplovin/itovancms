import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPen, FaUser, FaUsers } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ProtectedRoute from '../pages/ProtectedRoute';

function ManageUser() {
    const [showSidebar, setShowSidebar] = useState(true);
    const [users, setUsers] = useState([]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost/PROJECT/backend/deleteUser.php?id=${userId}`);
            // Fetch users again after successful deletion
            fetchUsers();
            // Optionally, you can handle success message here
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error message
        }
    };

    const fetchUsers = async () => { // Define fetchUsers function
        try {
            const response = await axios.get('http://localhost/PROJECT/backend/getUsers.php');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when component mounts
    }, []);

    return (
        <section className="dashboard">
            <div className="container dashboard__container">
                <button onClick={toggleSidebar} className="sidebar__toggle">{showSidebar ? <FaChevronRight /> : <FaChevronLeft />}</button>
                <aside style={{ left: showSidebar ? "0" : "-100%" }}>
                    <ul>
                        <li>
                            <Link to="/admin/addpost">
                                <FaPen />
                                <h5>Add Post</h5>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/manage-post">
                                <BsPostcard />
                                <h5>Manage Posts</h5>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/adduser">
                                <FaUser />
                                <h5>Add User</h5>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/manage-user" className="active">
                                <FaUsers />
                                <h5>Manage Users</h5>
                            </Link>
                        </li>
                    </ul>
                </aside>
                <main>
                    <h2>Manage User</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td><Link to={`/admin/edit-user/${user.id}`} className="btn sm">Edit</Link></td>
                                    <td><button onClick={() => deleteUser(user.id)} className="btn sm danger">Delete</button></td>
                                    <td>{user.is_admin ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </section>
    );
}

export default ManageUser;
