import React from 'react';
import MainScreen from '../MainScreen/MainScreen';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Accordion,Container } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
export default function MyNotes() {
  const deleteHandler = () => {
    // Delete handler logic
  };

  const notes = [];

  return (
    <div>
      <MainScreen title="Welcome Back Sahil Attar">
        <Link to="/CreateNote" className="btn btn-outline-primary">
          Create New Note
        </Link>
      <Accordion>
      <Card style={{margin:"5px"}}>
        <Card.Header style={{display:'flex',justifyContent:'space-between'}}>
          <CustomToggle eventKey="0">Title    </CustomToggle>
           <div style={{display:'flex',alignItems:"center",justifyContent: "space-between"}} >
            <Button variant="outline-primary" className="mx-2" >Edit</Button>
           <Button variant="outline-danger" className="mx-2">Delete</Button>
           </div>
        
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
      </MainScreen>
    </div>
  );
}
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <h4
      style={{ color: 'green' }}
      onClick={decoratedOnClick}
    >
      {children}
    </h4>
  );
}

