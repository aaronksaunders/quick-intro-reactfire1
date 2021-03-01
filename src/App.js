import { AuthCheck } from "reactfire";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./Login";
import Home from "./Home";
import "./App.css";
import { useDispatch } from "react-redux";
import { setAuthListener } from "./features/userAuth/userAuthSlice";

function App() {
  const dispatch = useDispatch();

  (async () => await dispatch(setAuthListener()))();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthCheck fallback={<Login />}>
          <Route exact path="/" component={Home} />
        </AuthCheck>
      </Suspense>
    </Router>
  );
}

export default App;
