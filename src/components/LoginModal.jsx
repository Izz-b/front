import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { request, setAuthToken } from "../services/axios_helper";
import { useState,useCallback } from 'react';
import {monitorTokenExpiration} from '../services/JWToken';

export default function LoginModal({ show, handleClose, onLogin, setRole,handleLogout}) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword, setShowPassword] = useState(false);
  const ALLOWED_ROLES = ["ADMIN", "CHEF", "DIRECTEUR"];
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginServer = useCallback(async (e) => {
      e.preventDefault();
      setErrorMessage(""); // reset message

      if (email.trim() === '' || password.trim() === '') {
        setErrorMessage("Veuillez remplir tous les champs.");
        return; }
      try {
        const response = await request("POST", "/api/users/login", { email, password});
        const { token, role: roleUser } = response.data || {};
        if (token) {
          // Authentification réussie
          setRole(roleUser);
          if (!ALLOWED_ROLES.includes(roleUser)) {
            setErrorMessage("⚠️ Accès refusé : cette version du site est réservée aux administrateurs.");
            return;
          }
          else {
            // Si tout est bon, appel du callback
            monitorTokenExpiration(token, handleLogout);
            onLogin(); setAuthToken(token);
          }
        } else{
          setErrorMessage("Authentification échouée : token non reçu.");
          return;}
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
      }
    }, [email, password, onLogin]);
    
    return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQPYIu2c4AQqymWsBvjL2lrdVIhe4s.png"
            alt="ISIM Logo"
            className="mb-4"
            style={{ width: "80px", height: "80px" }}
          />
        <Modal.Title>Connexion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onLoginServer}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Entrez votre email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Mot de passe</Form.Label>
            <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
          </Form.Group>
          {/* Affichage du message d'erreur stylé */}
          {errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Se connecter</Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};