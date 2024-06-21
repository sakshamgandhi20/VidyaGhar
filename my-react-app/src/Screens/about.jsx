import React from "react";
import book from "../images/book.jpg";
import "./about.css";
import Footer from "../components/Footer";
import lovepreet from "../images/lovepreet.jpg";
import pooja from "../images/pooja.jpg";
import saksham from "../images/saksham.jpg";
const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="image-container">
          <img src={book} />
        </div>
        <div className="text-container">
          <h1>About the project</h1>
          <p>
            We have developed a website dedicated to facilitating the buying and
            selling of used books at affordable prices. This initiative is
            designed to be environmentally friendly by promoting the reuse of
            books, thereby reducing waste and the demand for new book
            production. Additionally, the platform fosters a collaborative
            educational environment by making learning resources more accessible
            to a broader audience. By encouraging the exchange of pre-owned
            books, the website supports both sustainability and community-driven
            education.
          </p>
        </div>
      </div>
      <h1 style={{ fontSize: "36px", textAlign: "center" }}>Developers</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col-md">
            <div className="card" style={{ width: '18rem' }}>
              <img src={saksham} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Saksham Gandhi</h5>
                
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="card" style={{ width: '18rem' }}>
              <img src={lovepreet} className="card-img-top" alt="..."  style={{height:'300px'}}/>
              <div className="card-body">
                <h5 className="card-title">Lovepreet Sharma</h5>
                
               
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="card" style={{ width: '18rem' }}>
              <img src={pooja} className="card-img-top" alt="..."style={{height:'300px'}} />
              <div className="card-body">
                <h5 className="card-title">Pooja Devi</h5>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default About;
