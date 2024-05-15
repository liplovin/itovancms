import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePost = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost/PROJECT/backend/singlepost.php?id=${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div>
      {post && (
        <article key={post.id} className="single-post">
          <section className="post">
            <div className="container post__container">
              <div className="post__thumbnail">
                <img src={post.thumbnail} alt="Thumbnail" />
              </div>
              <div className="post__info">
                <h2 className="post__title">{post.title}</h2>
                <p className="post__body">{post.body}</p>
                <div className="post__author">
                  <div className="post__author-info">
                    <small>{post.date}</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
}

export default SinglePost;
