import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = () => {
    return (
        <footer>
            <div className="footer__socials">
                <a href="https://www.facebook.com/clsfchurch" target="_blank"><FaFacebookF /></a>
                <a href="https://www.instagram.com" target="_blank"><FaInstagram /></a>
                <a href="https://www.youtube.com/clsfchurch" target="_blank"><FaYoutube /></a>
            </div>

            <div className="container footer__container">
                <article>
                    <h4>Permalinks</h4>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">AboutUs</a></li>
                        <li><a href="">New Here</a></li>
                        <li><a href="">News</a></li>
                        <li><a href="">Branches</a></li>
                    </ul>
                </article>
                <article>
                    <h4>Support</h4>
                    <ul>
                        <li><a href="">Contact</a></li>
                        <li><a href="">Call Numbers</a></li>
                        <li><a href="">Email</a></li>
                        <li><a href="">Location</a></li>
                    </ul>
                </article>
            </div>
            <div className="footer__copyright">
                <small>Copyright &copy; CLSF WEBSITE 2024 </small>
            </div>
        </footer>
    );
};

export default Footer;
