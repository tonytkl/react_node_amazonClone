import { useState } from "react";
import "./user.css";
import { endPoint } from "../../config/constant";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      fetch(endPoint + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors[0].msg);
          } else if (data.message) {
            alert(data.message);
            const token = data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="login-page">
      <div id="login-window">
        <h1>Sign in</h1>
        <form method="POST" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">E-mail address</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" id="login-button" class="button" />
        </form>
        <p>
          By continuing, you agree to Amazon's{" "}
          <a href="https://www.amazon.ca/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=918816">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="https://www.amazon.ca/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=918814">
            Privacy Notice.
          </a>
        </p>
        <hr />
        <h2>Buying for work?</h2>
        <a
          className="big-text"
          href="https://www.amazon.ca/business/register/welcome?ref_=ab_reg_signin"
        >
          Shop on Amazon Buisiness
        </a>
      </div>
      <div id="signup-box">
        <p>New to Amazon?</p>
        <a href="/signup" class="button">
          Create your Amazon account
        </a>
      </div>
    </div>
  );
};

export default Login;
