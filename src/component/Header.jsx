import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// modal
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { FILTER_TITLE, SIGNIN } from "../redux/gobal";
import { toast } from "react-toastify";
import { signIn } from "../redux/api";
import { useWeb3 } from "../context/useUser";

function Header() {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const dispatch = useDispatch();
   const { user, setUser } = useWeb3();
   const [userd, setUserd] = useState({
      username: "",
      password: "",
   });

   async function handleSubmit() {
      try {
         const { data } = await signIn(userd);
         setUser(data?.user);
         await dispatch({ type: SIGNIN, user: { ...userd }, toast });

         setUserd({
            username: "",
            password: "",
         });
         handleClose();
      } catch (error) {
         console.log(error);
      }
   }

   async function handleSearch(e) {
      dispatch({ type: FILTER_TITLE, title: e.target.value });
   }

   async function logout() {
      try {
         localStorage.removeItem("persist:root");
         setUser({});
      } catch (error) {
         console.log(error);
      }
   }

   function handleToast() {
      toast.warn("Please Login");
   }
   return (
      <>
         <Navbar bg="light" expand="lg">
            <Container fluid>
               <div className="logo">
                  <img
                     style={{ width: "50px" }}
                     src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/278069465_399314882196478_7520157067818459898_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FTfe-nV5ySgAX9AwqKF&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfBlTwv72qlvCf8WpuCo8l7FyoEIg7zG8Se1G6bfLyEG2Q&oe=6381B6E5"
                     alt="avatar"
                  />
               </div>
               <Navbar.Brand href="/home">Blogs</Navbar.Brand>
               {user?._id ? (
                  <Navbar.Brand href="/create">Write</Navbar.Brand>
               ) : (
                  <Navbar.Brand onClick={handleToast}>Write</Navbar.Brand>
               )}
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
                  <Form className="d-flex">
                     <input
                        onChange={handleSearch}
                        type="search"
                        placeholder="Enter title"
                        className="input-all"
                        aria-label="Search"
                     />
                  </Form>
                  <>
                     {" "}
                     {user?._id && (
                        <NavDropdown title={user?.name} id="navbarScrollingDropdown">
                           <NavDropdown.Item width="60px" href="#action5" onClick={logout}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     )}
                  </>
                  {/* modal signin */}
                  {!user?._id && (
                     <Navbar.Brand href="#" onClick={handleShow}>
                        <div className="logo">Sigin</div>
                     </Navbar.Brand>
                  )}
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* modal signin */}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Signin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <label>Username</label>
               <input
                  className="input-all"
                  type="text"
                  onChange={(e) => setUserd({ ...userd, username: e.target.value })}
                  value={userd.username}
               />
               <label>Password</label>
               <input
                  className="input-all"
                  type="password"
                  onChange={(e) => setUserd({ ...userd, password: e.target.value })}
                  value={userd.password}
               />
               <a href="/signup">New account</a>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleSubmit}>
                  OK
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default Header;
