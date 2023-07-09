import "./LoginPage.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { loginUser } from "../../Store/authenticationSlice";
import { TransparentLoader } from "../../Component/TransparentLoader/TransparentLoader";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { authToken, authStatus } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    authToken &&
      navigate(location?.state?.from?.pathname || "/", { replace: true });
  }, [authToken, location, navigate]);

  function loginHandler(e) {
    e.preventDefault();
    dispatch(loginUser(loginData));
  }

  return (
    <>
      <div className="LoginPageContainer">
        <main className="LoginPageWrapper">
          <div className="ImageContainer">
            <div>Hello</div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
              dicta odit delectus velit cupiditate in possimus iste, deleniti at
              earum accusantium harum veritatis, unde sed exercitationem dolore
              explicabo autem molestiae?
            </p>
          </div>
          <div className="LoginFormContainer">
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
              <div className="LoginUserNameContainer">
                <input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  required
                  onChange={(e) => {
                    setLoginData({ ...loginData, username: e.target.value });
                  }}
                />
              </div>
              <div className="LoginPasswordContainer">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  value={loginData.password}
                  required
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value });
                  }}
                />
                <div
                  className="PasswordVisibility"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  <AiOutlineEye
                    style={{ display: passwordVisibility ? "block" : "none" }}
                  />
                  <AiOutlineEyeInvisible
                    style={{ display: passwordVisibility ? "none" : "block" }}
                  />
                </div>
              </div>
              <button type="submit">Login</button>
            </form>
            <button
              onClick={() => {
                setLoginData({
                  username: "adarshbalika",
                  password: "adarshbalika123",
                });
                dispatch(
                  loginUser({
                    username: "adarshbalika",
                    password: "adarshbalika123",
                  })
                );
              }}
            >
              Login As Guest
            </button>
            <div className="SignUpContainer">
              <p>
                Don&apos;t you have an account ?
                <span>
                  <Link to="/signup" className="SignupLink">
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </main>
        {authStatus === "pending" ? <TransparentLoader /> : null}
      </div>
    </>
  );
}
