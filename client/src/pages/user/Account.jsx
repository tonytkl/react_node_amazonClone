import { useState, useEffect } from "react";
import { titleCase } from "../../utils/utils";
import "./user.css";
import { getLocalToken } from "../../utils/utils";
import { endPoint } from "../../config/constant";

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(endPoint + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getLocalToken()[1],
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors[0].msg);
        } else {
          setUser(data);
        }
      });
  }, []);

  const handleLogout = () => {
    try {
      fetch(endPoint + "/user/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <>
      {user && (
        <div id="login-page">
          <div id="login-window">
            <h1>Account details</h1>
            <h2>Name</h2>
            <p>
              {titleCase(user.firstName)} {titleCase(user.lastName)}
            </p>
            <hr />
            <h2>Email</h2>
            <p>{user.email}</p>
            <hr />
            <button
              id="logout-button"
              className="button"
              onClick={handleLogout}
              class="button"
            >
              Logout
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}
export default Account;
