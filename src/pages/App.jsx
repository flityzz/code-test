import { useNavigate } from "react-router-dom";
import logo from "src/assets/codeleap-logo.svg";
import "src/css/App.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="app" onClick={() => navigate("/signup")}>
      <img src={logo} alt="logo" />
      <h1>Click anywere to signup!</h1>
    </div>
  );
};

export { App };
