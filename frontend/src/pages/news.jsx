import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Posts from './posts'; 


const News = () => {
  const [latestFeaturedPost, setLatestFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchLatestFeaturedPost = async () => {
      try {
        const response = await axios.get('http://localhost/PROJECT/backend/getLatestFeaturedPost.php');
        setLatestFeaturedPost(response.data);
      } catch (error) {
        console.error('Error fetching latest featured post:', error);
      }
    };

    fetchLatestFeaturedPost();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'; // Truncate text and append ellipsis
    } else {
      return text;
    }
  };

  return (
    <div>
      <section className="search__bar">
        <form className="container search__bar-container" action="#">
          <div>
            <i className="uil uil-search"></i>
            <input type="search" name="" placeholder="Search" />
          </div>
          <button type="submit" className="btn">Go</button>
        </form>
      </section>
      {latestFeaturedPost && (
        <article key={latestFeaturedPost.id} className="news">
          <section className="featured">
            <div className="container featured__container">
              <div className="post__thumbnail">
                <img src={latestFeaturedPost.thumbnail} alt="Thumbnail" />
              </div>
              <div className="post__info">
                
                <Link to={`/post/${latestFeaturedPost.id}`}>
                  <h2 className="post__title">{truncateText(latestFeaturedPost.title, 50)}</h2>
                </Link>
                <p className="post__body">{truncateText(latestFeaturedPost.body, 150)}</p>
                <div className="post__author">
                  <div className="post__author-info">
                    <small>{latestFeaturedPost.date}</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      )}
     
      <Posts />
    </div>
  );
}

export default News;
