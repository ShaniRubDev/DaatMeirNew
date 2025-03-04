import React, { FC } from 'react';
import './About.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import NavBar from '../NavBar/NavBar';

interface AboutProps {}

const About: FC<AboutProps> = () => {
  const navigate = useNavigate(); // פונקציה שמקבלת את הניווט

  // פונקציה שמבצעת את הניווט
  const handleNavigation = () => {
    navigate("/donation");
  };

  return  <div className="About">
       <NavBar></NavBar>
    {/* 🔹 תפריט הניווט */}
    {/* <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/">דעת מאיר</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#about">קצת עלינו</Nav.Link>
              <Nav.Link onClick={() =>  navigate("/donation")}>אופציות לתרומה</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/donationCart" className="cart-icon">
              <Icon.Cart3 size={50} color='black' className='m-t5'></Icon.Cart3>

              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      {/* 🔹 תוכן הדף הראשי */}
      <div className="container">
        <div className="content">
          <h1 className="title">תומכים בתורה, מחזקים את הקהילה</h1>
          <p className="subtitle">עמותת דעת מאיר – נתינה מתוך אהבת חסד</p>
          
          <div className="section">
            <p>העמותה פועלת מתוך אהבת ישראל וערבות הדדית, למען:</p>
            <ul className="list">
              <li>📖 תמיכה בלומדי התורה הקדושה</li>
              <li>❤️ סיוע למשפחות נזקקות</li>
              <li>📚 ליווי חינוכי, רגשי וחברתי</li>
              <li>💰 סיוע כלכלי – מתוך אהבת חסד</li>
            </ul>
          </div>

          <blockquote className="quote">
            "עץ חיים היא למחזיקים בה ותומכיה מאושר"
          </blockquote>

          <div className="donation-box">
            <p>הצטרפו אלינו והיו שותפים בזכות הנתינה</p>
            <button className="button" onClick={() => window.location.href = "/donation"}>
              לתרומה עכשיו
            </button>
          </div>
        </div>
      </div>
</div>
}
 

export default About;
