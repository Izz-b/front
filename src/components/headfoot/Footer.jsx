import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <Container>
        <p>© {new Date().getFullYear()} ISIMM - Tous droits réservés.</p>
      </Container>
    </footer>
  );
};

export default Footer;
