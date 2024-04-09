import "./login.css";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-window">
        <h1>Sign in</h1>
        <form method="POST">
          <div>
            <label htmlFor="email">E-mail address</label>
            <br />
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" name="password" required />
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
        <a href="https://www.amazon.ca/business/register/welcome?ref_=ab_reg_signin">
          Shop on Amazon Buisiness
        </a>
      </div>
      <div id="signup-box">
        <p>New to Amazon?</p>
        <a href="/sign-up" class="button">
          Create your Amazon account
        </a>
      </div>
    </div>
  );
};

export default Login;
