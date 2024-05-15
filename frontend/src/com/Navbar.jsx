import React, { useState, useContext } from 'react';
import '../style.css'; 
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';

function Nav() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { isAuthenticated, userRole, logout } = useContext(AuthContext);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <div className="container nav__container">
                <Link to="/" className="nav__logo">CLSF</Link>
                <ul className={`nav__items ${isNavOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/branches">Branches</Link></li>
                    {!isAuthenticated ? (
                        <li className="nav__profile">
                               <div className="nav__container">
                            <Link to="/signin">Login</Link>
                            </div>
                        </li>
                        
                    ) : (
                        
                        <li className="nav__profile">
                            <div className="container nav__container">
                            <li>Login</li>
                            </div>
                            <ul>
                               <li><Link to={userRole === 'admin' ? '/admin/dashboard' : '/users/dashboard'}>
                                    Dashboard
                                </Link></li> 
                                <li><Link to="/" onClick={handleLogout}>Logout</Link></li> 
                                </ul>
                        </li>
                    )}
                </ul>
                <button onClick={toggleNav}>
                    {isNavOpen ? <IoClose /> : <IoMenu />}
                </button>
            </div>
        </nav>
    );
}

export default Nav;