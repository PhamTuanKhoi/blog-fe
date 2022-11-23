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
import { useEffect } from "react";
import { signIn } from "../redux/api";

function Header() {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [isLogin, SetIsLogin] = useState(false);
   const dispatch = useDispatch();
   const [user, setUser] = useState({
      username: "",
      password: "",
   });
   const [profile, setProfile] = useState({});

   useEffect(() => {
      let token = localStorage.getItem("persist:root");
      if (JSON.parse(token)?.auth) {
         fetchUser();
      }
   }, [isLogin]);

   async function fetchUser() {
      let token = localStorage.getItem("persist:root");
      let parse = JSON.parse(token).auth;
      let resUser = JSON.parse(parse).user;

      if (resUser?._id) {
         SetIsLogin(true);
         setProfile(resUser);
      }
   }

   async function handleSubmit() {
      try {
         const { data } = await signIn(user);
         setProfile(data?.user);
         await dispatch({ type: SIGNIN, user: { ...user }, toast });

         SetIsLogin(true);
         // toast.success(`Signup success`);
         setUser({
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
      } catch (error) {
         console.log(error);
      }
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
               <Navbar.Brand href="/create">Write</Navbar.Brand>
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
                  {isLogin && (
                     <>
                        {" "}
                        <NavDropdown title={profile?.name} id="navbarScrollingDropdown">
                           <NavDropdown.Item width="60px" href="#action5" onClick={logout}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     </>
                  )}
                  {/* modal signin */}
                  {isLogin === false && (
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
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  value={user.username}
               />
               <label>Password</label>
               <input
                  className="input-all"
                  type="password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user.password}
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
