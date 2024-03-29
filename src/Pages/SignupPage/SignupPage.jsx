import "./SignupPage.css";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { signupUser } from "../../Store/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { TransparentLoader } from "../../Component/TransparentLoader/TransparentLoader";
import { CustomizeToast } from "../../Utils/CustomizeToast";

export function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    city: "",
  });
  const { authToken, authStatus } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    authToken &&
      navigate(location?.state?.from?.pathname || "/", { replace: true });
  }, [authToken, location, navigate]);

  function validateSignUpData() {
    const signupFields = Object.keys(signupData);
    for (let i = 0; i < signupFields.length; i++) {
      if (signupData[signupFields[i]].trim() === "") {
        return {
          validated: false,
          errorMessage: `${signupFields[i]} is not allow to be empty`,
        };
      }
    }
    return { validated: true, errorMessage: null };
  }

  function signupHandler(e) {
    e.preventDefault();
    const { validated, errorMessage } = validateSignUpData();
    if (validated) {
      dispatch(signupUser(signupData));
    } else {
      CustomizeToast("warning", errorMessage);
    }
  }

  return (
    <div className="SignupPageContainer">
      <main className="SignupPageWrapper">
        <div className="ImageContainer">
          <div>Hello</div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
            dicta odit delectus velit cupiditate in possimus iste, deleniti at
            earum accusantium harum veritatis, unde sed exercitationem dolore
            explicabo autem molestiae?
          </p>
        </div>
        <div className="SignupFormContainer">
          <h2>Sign Up</h2>
          <form onSubmit={signupHandler}>
            <div className="SignupUserNameContainer">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => {
                  setSignupData({ ...signupData, username: e.target.value });
                }}
              />
            </div>
            <div className="SignupPasswordContainer">
              <input
                type="text"
                placeholder="Password"
                required
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                }}
              />
            </div>
            <div className="SignupCityContainer">
              <input
                type="text"
                placeholder="City"
                required
                onChange={(e) => {
                  setSignupData({ ...signupData, city: e.target.value });
                }}
              />
            </div>
            <button type="submit">Sign Up</button>
            <div className="LoginContainer">
              <p>
                Have an account?
                <span>
                  <Link to="/login" className="LoginLink">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </main>
      {authStatus === "pending" ? <TransparentLoader /> : null}
    </div>
  );
}
