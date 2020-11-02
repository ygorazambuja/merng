import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar></MenuBar>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
