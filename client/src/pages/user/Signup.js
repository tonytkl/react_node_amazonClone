import "./user.css";

const Signup = () => {
  return (
    <div id="login-page">
      <div id="login-window">
        <h1>Create account</h1>
        <form method="POST">
          <div>
            <label htmlFor="firstName">Your first name</label>
            <br />
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">Your last name</label>
            <br />
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div>
            <label htmlFor="email">E-mail address</label>
            <br />
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeHolder="At least 6 characters"
              required
            />
            <p style={{ marginBottom: "5px" }}>
              Passwords must consist of at least 6 characters.
            </p>
          </div>
          <div>
            <label htmlFor="passwordVerify">Password again</label>
            <br />
            <input
              type="password"
              id="passwordVerify"
              name="passwordVerify"
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
