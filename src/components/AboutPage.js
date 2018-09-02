import React from 'react';
//import { Link } from 'react-router-dom';
import '../styles/about-page.scss';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div className="main-about-container">
      <h1 className="alt-header">About</h1>
      <p>
        TMDb is a movie database system created as a testing project for the recruitment process of Thoughtworks UI Hiring Challenge
        <br/>
        <br/>
        

        
      </p>
      <div className="author"><div className="my-photo"></div>
      <div className="my-details">
      &copy;Dk Saha. 2018.
        <br/>
        Contact: <a href="mailto:dhrtklpsh82@gmail.com">dhrtklpsh82@gmail.com</a>
      </div></div>
      
    </div>
  );
};

export default AboutPage;