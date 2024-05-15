import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";



function ManagePostUser() {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <section className="dashboard">
            <div className="container dashboard__container">
                <button onClick={toggleSidebar} className="sidebar__toggle">{showSidebar ? <FaChevronRight /> : <FaChevronLeft />}</button>
                <aside style={{ left: showSidebar ? "0" : "-300%" }}>
                    <ul>
                        <li>
                            <Link to="/users/addpost">
                                <FaPen />
                                <h5>Add Post</h5>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/manage-post-users" className="active">
                                <BsPostcard />
                                <h5>Manage Posts</h5>
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
                            <tr>
                                <td>News</td>
                                <td><Link to="/edit-post" className="btn sm">Edit</Link></td>
                                <td><Link to="/delete-post" className="btn sm danger">Delete</Link></td>
                            </tr>
                            <tr>
                                <td>News</td>
                                <td><Link to="/edit-post" className="btn sm">Edit</Link></td>
                                <td><Link to="/delete-post" className="btn sm danger">Delete</Link></td>
                            </tr>
                            <tr>
                                <td>News</td>
                                <td><Link to="/edit-post" className="btn sm">Edit</Link></td>
                                <td><Link to="/delete-post" className="btn sm danger">Delete</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </section>
    );
}

export default ManagePostUser;
