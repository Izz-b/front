import Header from './components/headfoot/Header';
import Footer from './components/headfoot/Footer';
import { Container } from "react-bootstrap";
import AppComponent from './components/AppComponent';
import { useState,useCallback } from 'react';
import LoginModal from './components/LoginModal';
import {setAuthToken } from "/src/services/axios_helper";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role,setRole]=useState("");
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  const onLogout = useCallback(() => {
      setAuthToken(null); // Suppression du token lors de la déconnexion
    }, []);
  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout();
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout} />
      <LoginModal show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        onLogin={handleLogin} setRole={setRole} 
        handleLogout={handleLogout}/>

      <Container className="mt-4">
        <AppComponent isLoggedIn={isLoggedIn} role={role}/>
      </Container>
      <Footer />
    </>
  );
}

// Exportation du composant App pour qu'il puisse être utilisé dans index.js
export default App;
