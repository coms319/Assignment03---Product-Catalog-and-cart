import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Row,
  Form,
  Col,
} from "react-bootstrap";
import {
  IoChevronBackCircleSharp,
  IoChevronForwardCircleSharp,
} from "react-icons/io5";

const Cart = ({
  viewer,
  setViewer,
  cart,
  cartTotal,
  addToCart,
  removeFromCart,
  setUserInfo,
}) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  const handleBackwardsClick = () => {
    setViewer(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleForwardClick = () => {
    setViewer(2);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.address1) newErrors.address1 = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "A valid email is required";
    }

    if (!form.cardNumber || !/^\d{16}$/.test(form.cardNumber)) {
      newErrors.cardNumber = "A valid 16-digit card number is required";
    }

    if (!form.zip || !/^\d{5}$/.test(form.zip)) {
      newErrors.zip = "A valid 5-digit zip code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (validateForm()) {
      setUserInfo(form);
      setViewer(2);
    }
  };

  const taxRate = 0.07;
  const totalWithTax = cartTotal * (1 + taxRate);

  return (
    <>
      {viewer === 1 && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Nav className="me-auto">
                <Button variant="outline-light" onClick={handleBackwardsClick}>
                  <IoChevronBackCircleSharp /> Return
                </Button>
              </Nav>
              <Nav className="ms-auto">
                <Button variant="outline-light" onClick={handleOrder}>
                  <IoChevronForwardCircleSharp /> Order
                </Button>
              </Nav>
            </Container>
          </Navbar>
          <Container className="py-4">
            <Row>
              {Object.keys(cart).length > 0 ? (
                <>
                  {Object.values(cart).map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3"
                    >
                      <img
                        src={item.image}
                        width={50}
                        alt={item.title}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0">{item.title}</p>
                        <p className="text-muted mb-0">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-muted mb-0">Quantity: {quantity}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="danger"
                          className="mx-1"
                          onClick={() => removeFromCart(item)}
                        >
                          -
                        </Button>
                        <Button
                          variant="primary"
                          className="mx-1"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <h5>Total: ${totalWithTax.toFixed(2)} (Tax included)</h5>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </Row>

            <h3 className="mt-4">Payment Information</h3>
            <Form>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.cardNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={form.address1}
                  onChange={handleInputChange}
                  isInvalid={!!errors.address1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address1}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="address2"
                  value={form.address2}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleInputChange}
                      isInvalid={!!errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleInputChange}
                      isInvalid={!!errors.zip}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zip}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default Cart;
