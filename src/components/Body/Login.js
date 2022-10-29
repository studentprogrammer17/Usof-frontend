import React, { useEffect,useState } from 'react';
import { getCookie } from '../getCookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [checkAuth, setAuth] = useState(false);
    const [userData, setuserData] = useState({});
    const [err, setErr] = useState([]);
    const [classes, setClass] = useState("");
    let errorsA = [];
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
        if (checkAuth) {
          document.cookie = `token=${userData.token};`;
          document.cookie = `userId=${userData.userId};`;
          document.cookie = `login=${login};`;
        }
    }, [checkAuth, userData]);

    async function toLogin() {
        await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST', 
            body: JSON.stringify({
                login,
                password,
            }),
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`
            },
        })
        .then((res) => res.json())
        .then((result1) => {

          let resAuth = false;
          let resInfo = {};
          let error = '';
  
          if (!result1.text) {
            resAuth = true;
            resInfo = result1;
          } else {
            error = result1.message;
          }
  
          setuserData(() => resInfo);
          setAuth(() => resAuth);
          setErr(() => [result1.message]);

          if(result1.message === "Ви успішно зайшли!") {
            setClass("alert alert-success");
            setTimeout(() => window.location.href="/", 1200);
          }
          else {
            setClass("alert alert-danger");
          }
        });
    }

  //   useEffect(() => {
  //     let login = getCookie("login")
  //     if (isUserLoggedIn || login.length > 0) {
  //       window.location.href="/"
  //     }
  //     else {
  //       console.log("a")
  //     }
  // }, []);

    return(
        <div className = "col-sm-6 offset-sm-3">
            <h1>Логін</h1>
            <input type = "text" value = {login} onChange={(e)=>setLogin(e.target.value)} className = "form-control" placeholder = "Логін"></input>
            <br/>
            <input type = "password" value = {password} onChange={(e)=>setPassword(e.target.value)} className = "form-control" placeholder = "Пароль"></input>
            <br/>
              <button onClick = {toLogin} className = "btn btn-primary">Увійти</button>
              <br/>
              <br/>
              <button onClick={() => {window.location.href="/reset-password"}} className = "btn btn-primary">Забули пароль?</button>
            {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
        </div>
    )
}

export default Login;