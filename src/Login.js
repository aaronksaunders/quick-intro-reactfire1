import React from "react";
import "./App.css";

// redux
import { useDispatch, useStore } from "react-redux";
import { login, createUser } from "./features/userAuth/userAuthSlice";
function Login() {
  const dispatch = useDispatch();
  const { getState } = useStore();

  /**
   *
   * @param {*} _event
   */
  const handleSubmit = async (_event) => {
    _event.preventDefault();
    const { email, password } = _event.target.elements;

    try {
      if (_event.nativeEvent.submitter?.name === "createAccount") {
        await dispatch(
          createUser({ email: email.value, password: password.value })
        );
        alert("Account Created");
        return;
      }

      await dispatch(login({ email: email.value, password: password.value }));

      alert("Logged In: " + getState().userAuth.userData?.email);
    } catch (e) {
      alert("ERROR: " + e.message);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          style={{ display: "block", margin: 12, width: 220 }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          style={{ display: "block", margin: 12, width: 220 }}
        />
        <button type="submit" name="login" style={{ margin: 12 }}>
          LOGIN
        </button>
        <button type="submit" name="createAccount" style={{ margin: 12 }}>
          CREATE ACCOUNT
        </button>
      </form>
    </div>
  );
}

export default Login;
