import React from 'react';
import { Link } from 'react-router-dom';



const Featured = () => {
  return (
    <section className="featured">
      <div className="container featured__container">
        <div className="post__thumbnail">

        </div>
        <div className="post__info">
          <Link to="/post">News</Link>
          <h2 className="post__title"><Link to="/post">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, incidunt?</Link></h2>
          <p className="post__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia culpa voluptatum error ab illum repudiandae a beatae natus cupiditate. Quidem.</p>
          <div className="post__author">
            <div className="post__author-info">

              <small>March 20, 2023 10:10am</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
