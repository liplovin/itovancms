import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost/PROJECT/backend/getPosts.php');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    // Function to truncate text to a specified length and append ellipsis
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    };

    return (
        <section className="posts">
            <div className="container posts__container">
                {Array.isArray(posts) && posts.map((post) => (
                    <article key={post.id} className="post">
                        <div className="post__thumbnail">
                            <img src={`http://localhost/PROJECT/frontend/src/images/${post.thumbnail}`} alt="Thumbnail" />
                        </div>
                        <div className="post__info">
                            <Link to={`/post/${post.id}`}></Link>
                            <h3 className="post__title">
                                <Link to={`/post/${post.id}`}>{truncateText(post.title, 50)}</Link>
                            </h3>
                            <p className="post__body">{truncateText(post.body, 150)}</p>
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

export default Posts;
