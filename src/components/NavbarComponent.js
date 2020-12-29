import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap'

const NavbarComponent = () => {
    return (
        <Navbar variants="dark" expand="lg">
            <Container>
            <Navbar.Brand href="#home"><strong>Lindungi Hutan</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent