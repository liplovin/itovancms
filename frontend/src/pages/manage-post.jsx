import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import axios from 'axios';

function ManagePost() {
    const [showSidebar, setShowSidebar] = useState(true);
    const [posts, setPosts] = useState([]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    useEffect(() => {
        // Fetch posts when the component mounts
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost/PROJECT/backend/fetchPosts.php');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            const response = await axios.get(`http://localhost/PROJECT/backend/deletePost.php?postId=${postId}`);
            console.log(response.data);
            
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <section className="dashboard">
            <div className="container dashboard__container">
                <button onClick={toggleSidebar} className="sidebar__toggle">{showSidebar ? <FaChevronRight /> : <FaChevronLeft />}</button>
                <aside style={{ left: showSidebar ? "0" : "-300%" }}>
                    <ul>
                        <li>
                            <Link to="/admin/addpost">
                                <FaPen />
                                <h5>Add Post</h5>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/manage-post" className="active">
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
                            <Link to="/admin/manage-user">
                                <FaUsers />
                                <h5>Manage User</h5>
                            </Link>
                        </li>
                    </ul>
                </aside>
                <main>
                    <h2>Manage Post</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(posts) && posts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td><Link to={`/admin/edit-post/${post.id}`} className="btn sm">Edit</Link></td>
                                    <td>
                                        <button onClick={() => handleDelete(post.id)} className="btn sm danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </section>
    );
}

export default ManagePost;
