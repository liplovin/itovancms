import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import Footer from '../com/Footer';

function Users() {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <section className="dashboard">
            <div className="container dashboard__container">
                <button onClick={toggleSidebar} className="sidebar__toggle">{showSidebar ? <FaChevronLeft /> : <FaChevronRight />}</button>
                <aside style={{ left: showSidebar ? "0" : "-300%" }}>
                    <ul>
                        <li>
                            <Link to="/users/addpost">
                                <FaPen />
                                <h5>Add Post</h5>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/manage-post-users">
                                <BsPostcard />
                                <h5>Manage Posts</h5>
                            </Link>
                        </li>

                    </ul>
                </aside>
                <Footer />
            </div>
        </section>
    );
}

export default Users;
