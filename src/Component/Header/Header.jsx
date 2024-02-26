import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form,FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
export default function Header() {
 const dispatch=useDispatch();
 const navigate=useNavigate()
 const userLogin=useSelector((state)=>state.userLogin);
 const {userInfo}=userLogin;

  const logoutHandler=()=>{
     dispatch(logout());
     navigate("/");
  }
 const gotoProfile=()=>{
  navigate("/profile");
 }
 const gotoMyNotes=()=>{
  navigate("/mynotes")
 }
  return (
    <div>
     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-success">Smart Notes</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                
                />
              </Form>
        
          </Nav>
                <Nav>
            {userInfo ? (
              <>
                <Nav.Link onClick={()=>gotoMyNotes()}>My Notes</Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={()=>gotoProfile()} >
                    <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    />
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
       
            
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}


