import React from 'react';
import { Navbar, Nav, Button, Container, Row } from 'react-bootstrap';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

const Summary = ({ viewer, setViewer }) => {
  const handleBackwardsClick = () => {
    setViewer(1);
  };

  return (
    <>
      {viewer === 2 && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Nav className="me-auto">
                <Button variant="outline-light" onClick={handleBackwardsClick}>
                  <IoChevronBackCircleSharp /> Cart
                </Button>
              </Nav>
            </Container>
          </Navbar>
          <Container className="mt-4">
            <Row>TODO</Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Summary;
