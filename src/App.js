import { AuthCheck, useAuth } from "reactfire";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./Login";
import Home from "./Home";
import "./App.css";

function App() {
  const auth = useAuth();
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
