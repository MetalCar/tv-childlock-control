import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TvAliveBadge from "./components/TvAliveBadge";
import TvButtons from "./components/TvButtons";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/">
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="/">CHILDLOCK-CONTROL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <TvButtons />
          <TvAliveBadge />
        </Navbar.Collapse>
      </Navbar>
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
