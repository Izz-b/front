import WelcomeComponent from "./WelcomeComponent";
import AdminDashboard from "./AuthContent/AdminDashboard";
import DepartmentHeadDashboard from "./AuthContent/DepartmentHeadDashboard";
import StudiesDirectorDashboard from "./AuthContent/StudiesDirectorDashboard";
import PropTypes from 'prop-types';
 
export default function AppComponent({isLoggedIn ,role}) {

  return (
    <div>
      {isLoggedIn==false && <WelcomeComponent />}
      {role=='ADMIN' && <AdminDashboard/>}
      {role=='CHEF' && <DepartmentHeadDashboard/>}
      {role=='DIRECTEUR' && <StudiesDirectorDashboard/>}
    </div>
  );
}

AppComponent.propTypes ={
  isLoggedIn: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
}