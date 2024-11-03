import React from "react";
import { Navbar, Button, Container, Row, Col, Card } from "react-bootstrap";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const Summary = ({
  viewer,
  setViewer,
  cart,
  cartTotal,
  userInfo,
  resetCart,
}) => {
  const handleBackToBrowse = () => {
    resetCart();
    setViewer(0);
  };

  const redactCardNumber = (cardNumber) => {
    return cardNumber
      ? "**** **** **** " + cardNumber.slice(-4)
      : "**** **** **** ****";
  };

  const taxRate = 0.07;
  const totalWithTax = cartTotal * (1 + taxRate);

  return (
    <>
      {viewer === 2 && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>Order Confirmation</Navbar.Brand>
              <Button variant="outline-light" onClick={handleBackToBrowse}>
                <IoChevronBackCircleSharp /> Back to Browse
              </Button>
            </Container>
          </Navbar>
          <Container className="mt-4">
            <h3>Thank you for your order!</h3>
            <p>Your order has been successfully placed. Here’s a summary:</p>

            <h4>Purchased Items</h4>
            <Row>
              {Object.values(cart).map(({ item, quantity }) => (
                <Col key={item.id} md={4} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>Quantity: {quantity}</Card.Text>
                      <Card.Text>
                        Price: ${(item.price * quantity).toFixed(2)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <h5>Total with Tax: ${totalWithTax.toFixed(2)}</h5>

            <h4 className="mt-4">User Information</h4>
            <p>
              <strong>Full Name:</strong> {userInfo.fullName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email || "N/A"}
            </p>
            <p>
              <strong>Shipping Address:</strong>
              {userInfo.address1 || ""}
              {userInfo.address2 ? `, ${userInfo.address2}` : ""},{" "}
              {userInfo.city || ""}, {userInfo.state || ""} {userInfo.zip || ""}
            </p>
            <p>
              <strong>Card Number:</strong>{" "}
              {redactCardNumber(userInfo.cardNumber)}
            </p>
          </Container>
        </>
      )}
    </>
  );
};

export default Summary;
