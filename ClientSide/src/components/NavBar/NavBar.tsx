// import React, { FC } from 'react';
// import './NavBar.scss';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { FaShoppingCart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import * as Icon from 'react-bootstrap-icons';

// interface NavBarProps {}


// const NavBar: FC<NavBarProps> = () => {
//     const navigate = useNavigate(); // פונקציה שמקבלת את הניווט
  
//     // פונקציה שמבצעת את הניווט
//     const handleNavigation = () => {
//       navigate("/donation");
//     };
    
//   return  <div className="NavBar">
//      <Navbar bg="light" expand="lg" className="navbar">
//         <Container>
//           <Navbar.Brand href="/">דעת מאיר</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Nav.Link href="#about">קצת עלינו</Nav.Link>
//               <Nav.Link onClick={() =>  navigate("/donation")}>אופציות לתרומה</Nav.Link>
//             </Nav>
//             <Nav>
//               <Nav.Link href="/donationCart" className="cart-icon">
//               <Icon.Cart3 size={50} color='black' className='m-t5'></Icon.Cart3>

//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

// </div>
// }
 


// export default NavBar;

import React, { FC } from 'react';
import './NavBar.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useState } from 'react';
import DonationCart from '../DonationCart/DonationCart'; // יבוא את קומפוננטת עגלת הקניות
import { RootState } from '../../redux/store';

const NavBar: FC = () => {
  const navigate = useNavigate();
  const [cartVisible, setCartVisible] = useState(false);  // מצב של הצגת העגלה
  const cart = useSelector((state: RootState) => state.cart.cartItems);


  return (
    <div className="NavBar">
      <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/"><img src="/images/logo.png" alt="Logo" className="navbar-logo" />
          דעת מאיר</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#about">קצת עלינו</Nav.Link>
              <Nav.Link onClick={() => navigate("/donation")}>אופציות לתרומה</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => setCartVisible(true)} className="cart-icon">
                <Icon.Cart3 size={50} color='black' className='m-t5'>{cart.length}</Icon.Cart3>
                <span className="cart-count">{cart.length}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* הצגת ה-Dialog של עגלת הקניות במידה ויש צורך */}
      {cartVisible && <DonationCart setCartVisible={setCartVisible} />}
    </div>
  );
};

export default NavBar;
