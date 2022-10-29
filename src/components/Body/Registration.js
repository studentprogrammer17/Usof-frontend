import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../getCookie';

function Registration() {

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [err, setErr] = useState([]);
    const [checkAuth, setAuth] = useState(false);
    const [userData, setuserData] = useState({});
    const [classes, setClass] = useState("");
    const navigate = useNavigate ();

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const token = getCookie("token");

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
            });   
        }
    }, [])

    
    useEffect(() => {
        let login = getCookie("login")
        if (isUserLoggedIn && login) {
          window.location.href="/"
        }
        else {
          console.log("a")
        }
    }, []);

    let errorsA = [];
    async function toRegister() {
        let result = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST', 
            body: JSON.stringify({
                login,
                password,
                confirmPassword,
                email,
                role: 'user',
            }),
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
            },
        });
        result = await result.json();
        if(result.message === "Ви були зареєстровані! Не забудьте підтвердити ваш емейл!") {
            setClass("alert alert-success");
            setTimeout(() => window.location.href="/login", 1200);
        }
        else {
            setClass("alert alert-danger");
        }
        errorsA.push(result.message)
        setErr(errorsA);
        console.log("result",result);
    }
    return(
        <div className = "col-sm-6 offset-sm-3">
            <h1>Реєстрація</h1>
            <input type = "text" value = {login} onChange={(e)=>setLogin(e.target.value)} className = "form-control" placeholder = "Логін"></input>
            <br/>
            <input type = "email" value = {email} onChange={(e)=>setEmail(e.target.value)} className = "form-control" placeholder = "емейл"></input>
            <br/>
            <input type = "password" value = {password} onChange={(e)=>setPassword(e.target.value)} className = "form-control" placeholder = "пароль"></input>
            <br/>
            <input  type = "password" value = {confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)} className = "form-control" placeholder = "підтвердити пароль"></input>
            <br/>
            <button onClick = {toRegister} className = "btn btn-primary">Зареєструватись</button>
            {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
        </div>
    )
}

export default Registration;