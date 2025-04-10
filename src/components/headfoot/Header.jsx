import { Navbar, Nav, Container ,Button } from "react-bootstrap";
import PropTypes from 'prop-types';

export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand href="#" className="fw-bold fs-3">ISIMM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="fs-5">Accueil</Nav.Link>
            <Nav.Link href="#about" className="fs-5">À Propos</Nav.Link>
            <Nav.Link href="#contact" className="fs-5">Contact</Nav.Link>
          </Nav>
          <div className="d-flex">
          {isLoggedIn ? (
              <Button className="fs-5 fw-semibold px-4 py-2" variant="outline-light" size="sm"
              onClick={onLogoutClick}> Se déconnecter</Button>) : (
              <Button className="fs-5 fw-semibold px-4 py-2" variant="outline-light" size="sm" 
              onClick={onLoginClick}> Se connecter</Button>)}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};