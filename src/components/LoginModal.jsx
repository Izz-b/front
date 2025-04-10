import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { request, setAuthToken } from "../services/axios_helper";
import { useState,useCallback } from 'react';

export default function LoginModal({ show, handleClose, onLogin}) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const onLoginServer = useCallback(async (e) => {
      e.preventDefault();
      if (email.trim() === '' || password.trim() === '') {
        console.error("Email et mot de passe requis.");
        return;
      }
      try {
        const response = await request("POST", "/api/users/login", { email, password,rememberMe});
        if (response.data?.token) {
          setAuthToken(response.data.token);
          /*before we move to the next page, we need to know the role of the user
           so that we can add it to the parametres of the next component*/
           onLogin();
        } else {
          console.error("Authentification échouée : token non reçu.");
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
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

          <Form.Group className="mb-3" controlId="formRemember">
            <Form.Check type="checkbox" label="Se souvenir de moi" 
             checked={rememberMe} onChange={handleRememberMeChange}/>
          </Form.Group>

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
};