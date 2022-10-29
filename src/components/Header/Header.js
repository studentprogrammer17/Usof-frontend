import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../logo.jpg';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

import {getCookie} from '../getCookie';




function Header() {
    const styles = {
        width: 35,
        height: 30,
        marginRight: "10px"
    };


    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const token = getCookie("token");
    const login = getCookie("login");



    function toLogOut() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.href="/";
    }


    useEffect(async () => {
        if (token) {
           await fetch(`http://localhost:8000/api/auth/check-token/${token}`, {
                method: 'GET', 
                mode: 'cors', 
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json',
                  "Accept": "application/json"
                },
            })
            .then((res) => res.json())
            .then(function(response){           
                setisUserLoggedIn(() => response.text);
                setUserRole(() => response.userRole);                
            });   
        }
    }, [])


    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <link rel="icon" srcSet={ logo } href={logo}/>
                    <Navbar.Brand href="/"> <img style = {styles} alt="" srcSet={ logo } />деВорог?</Navbar.Brand>
                    <Nav className="mr-auto navbar_wrapper">
                    <Router><Link to="/" onClick={() => {window.location.href="/"}}>Пости</Link></Router>
                    <Router><Link to="/info" onClick={() => {window.location.href="/info"}}>Інфо</Link></Router>
                        {
                            isUserLoggedIn ?
                            <>
                                <Router><Link to="/myPosts" onClick={() => {window.location.href="/myPosts"}}>Мої пости</Link></Router>
                            </>
                            :
                            <>
                                <Router><Link to="/register" onClick={() => {window.location.href="/register"}}>Реєстрація</Link></Router>
                                <Router><Link to="/login" onClick={() => {window.location.href="/login"}}>Логін</Link></Router>
                            </>
                        }
                        {
                            (isUserLoggedIn && userRole === 'admin') ?
                            <>
                                <div style = {{marginLeft: "10px", marginRight: "10px",  borderLeft: "3px solid white", height: "50px"}}></div>
                                <p style = {{color: "red"}}>Адмін панель</p>
                                <Router><Link to="/users" onClick={() => {window.location.href="/users"}}>Користувачи</Link></Router>
                                <Router><Link to="/categories" onClick={() => {window.location.href="/categories"}}>Категорії</Link></Router>
                            </>
                            :
                            <></>
                        }
                    </Nav>
                </Container>
                {
                    isUserLoggedIn ?
                    <>
                        <Nav>
                                <NavDropdown title = {login}>
                                    <NavDropdown.Item onClick={() => {window.location.href="/myprofile"}}>Профіль</NavDropdown.Item>
                                    <NavDropdown.Item onClick = {toLogOut}>Вийти</NavDropdown.Item>
                                </NavDropdown>
                        </Nav>
                    </>
                    :
                    <Nav></Nav>
                }
            </Navbar>
        </div>
    )
}

export default Header;