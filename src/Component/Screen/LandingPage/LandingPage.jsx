import React from 'react'
import "./LandingPage.css";
import { Container,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function LandingPage() {
  return (
    <div className='main'>
       <Container> 
        <Row>
             <div className='intro-text'>
                <div>
                    <h1 className='title'>Welcome to Smart Notes!</h1>
                    <p className='subtitle'>Elevate your note-taking experience with our intuitive notes app.</p>
                    <p className='subtitle'>Access For Anywhere & AnyTime</p>
                </div>
                <div className='buttonContainer'>
                    <Link className='btn btn-primary  text-white mx-3' to="/signUp">Sign Up</Link>
                    <Link className='btn btn-outline-primary ' to="/login">Login</Link>
                </div>
             </div>
        </Row>
       </Container>
    </div>
  )
}
