import { useEffect, useState, useRef } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import "src/css/Signup.css";

const Signup = () => {
  const [login, setLogin] = useState("");

  const isInputEmpty = login === "";

  const signupSubmitRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (signupSubmitRef.current) {
      if (isInputEmpty) {
        signupSubmitRef.current.classList.remove("enabled");
      } else {
        signupSubmitRef.current.classList.add("enabled");
      }
    }
  }, [isInputEmpty]);

  const handleSumit = (e) => {
    e.preventDefault();

    navigate({
      pathname: "/main",
      search: createSearchParams({
        login: login,
      }).toString(),
    });
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSumit}>
          <h1>Welcome to CodeLeap network!</h1>

          <span>please enter your username</span>

          <input type="text" onChange={(e) => setLogin(e.target.value)} />

          <input
            className="signup-submit-input"
            ref={signupSubmitRef}
            type="submit"
            value="ENTER"
            disabled={isInputEmpty}
          />
        </form>
      </div>
    </>
  );
};

export { Signup };
