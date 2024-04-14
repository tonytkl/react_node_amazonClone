import { useState } from "react";
import "./user.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:8000/user/register", {
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
            window.location.href = "/login";
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="login-page">
      <div id="login-window">
        <h1>Create account</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">Your first name</label>
            <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Your last name</label>
            <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              required
            />
          </div>
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
              placeHolder="At least 6 characters"
              minLength={6}
              onChange={handleChange}
              required
            />
            <p style={{ marginBottom: "5px" }}>
              Passwords must consist of at least 6 characters.
            </p>
          </div>
          <div>
            <label htmlFor="confirm_password">Password again</label>
            <br />
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              minLength={6}
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" id="login-button" class="button" />
        </form>
        <p>
          By creating an account, you agree to Amazon's{" "}
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
          Create a free business account
        </a>
        <hr />
        <p className="big-text">
          Already have an account?{" "}
          <a href="/login" className="big-text">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
