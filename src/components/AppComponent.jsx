import WelcomeComponent from "./WelcomeComponent";
import PropTypes from 'prop-types';
 
export default function AppComponent({isLoggedIn}) {

  return (
    <div>
      {isLoggedIn==false && <WelcomeComponent />}

    </div>
  );
}

AppComponent.propTypes ={
  isLoggedIn: PropTypes.bool.isRequired,
}