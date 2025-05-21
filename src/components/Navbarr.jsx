import React, { useContext, useState } from 'react';
import logo from '../assets/logo urbanfood.png';
import profile from '../assets/profile_icon.png';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import '../components/style/Navbar.css';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { food_list } from '../assets/assets';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';


const Navbarr = () => {

  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/')
      toast.success('Logged out successfully', {
        position: "top-center",
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {[false, 'sm', 'md', 'lg', 'xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar-custom-navbar navbar bg-body-primary mb-3">
          <Container fluid>
            <Navbar.Brand><Link to={"/"}>
              <img src={logo} className="logo ms-2" alt="logo" />
            </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} className="logo  " alt="logo" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className=" navbar-list justify-content-end flex-grow-1 pe-3 gap-1 gap-sm-1 gap-md-1 gap-lg-1 gap-xl-5">
                  <Nav.Link href="/" className=" text-dark hover-text-primary fs-5 fw-bold ">Home</Nav.Link>
                  <Nav.Link href="about" className="text-dark hover-text-primary fs-5 fw-bold">About us</Nav.Link>
                  <Nav.Link href="/menu" className="text-dark hover-text-primary fs-5 fw-bold">Our Menu</Nav.Link>
                  <Nav.Link href="blog" className="text-dark hover-text-primary fs-5 fw-bold">Blog</Nav.Link>
                  <Nav.Link href="/contact" className="text-dark hover-text-primary fs-5 fw-bold">Contact</Nav.Link>
                </Nav>
                <Form className=" d-flex">


                  <Nav>
                    <div className='header-search-icon mt-2 me-3 ms-xl-3 ms-lg-3 ms-md-3 ms-sm-3  mb-3 '>
                      <Link to='/cart'><img className='basket' src={assets.basket_icon} alt='' /></Link>
                      <div className={Object.keys(items).length === 0 ? "" : "dot"}></div>
                    </div>
                    {user ? (
                      <Nav.Link eventKey={2} >
                        <motion.button whileTap={{ scale: 0.6 }} onClick={handleLogout} className="logout-dot cursor-pointer me-3">
                          Logout
                        </motion.button>
                      </Nav.Link>
                    ) : (
                      <Nav.Link eventKey={2} >
                        <motion.img whileTap={{ scale: 0.6 }} onClick={() => navigate('/register')} src={profile} className="cursor-pointer rounded-b-full me-4 ms-lg-3 ms-md-3 ms-sm-3" alt="userprofile" />
                      </Nav.Link>
                    )}
                  </Nav>


                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <ToastContainer />
    </>
  )
}

export default Navbarr;