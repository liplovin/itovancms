import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Postss = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost/PROJECT/backend/getPosts2.php');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="posts">
            <div className="container posts__container">
                {Array.isArray(posts) && posts.map((post) => (
                    <article key={post.id} className="post">
                        <div className="post__thumbnail">
                            <img src={`http://localhost/PROJECT/frontend/src/images/${post.thumbnail}`} alt="Thumbnail" />
                        </div>
                        <div className="post__info">
                            <Link to={`/post/${post.id}`} ></Link>
                            <h3 className="post__title"><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                            <p className="post__body">{post.body}</p>
                            <div className="post__author">
                                <div className="post__author-info">
                                    <small>{post.date}</small>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Postss;
