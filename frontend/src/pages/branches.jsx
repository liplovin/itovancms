import React from 'react';
import Postss from './posts2';



const Branches = () => {
  return (
    <section className="search__bar">
      <form className="container search__bar-container" action="">
        <div>
          <i className="uil uil-search"></i>
          <input type="search" name="" placeholder="Search" />
        </div>
        <button type="submit" className="btn">Go</button>
      </form>
      <Postss />
    </section>
  );
}

export default Branches;
