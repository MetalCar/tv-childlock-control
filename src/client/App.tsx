import React from 'react';
import TvAliveBadge from "./components/TvAliveBadge";
import TvButtons from "./components/TvButtons";
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const App = () => {
    return <Navbar>
        <Navbar.Brand href="/">CHILDLOCK-CONTROL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Link to="/">Home</Link>
            <TvButtons />
            <TvAliveBadge />
        </Navbar.Collapse>
    </Navbar>
}

export default App;
