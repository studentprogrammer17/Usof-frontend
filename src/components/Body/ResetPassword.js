import React, { useState, useEffect } from 'react';

function ResetPassword() {

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [err, setErr] = useState([]);
    const [checkAuth, setAuth] = useState(false);
    const [userData, setuserData] = useState({});
    const [classes, setClass] = useState("");

    let errorsA = [];
    async function toReset() {
        let result = await fetch('http://localhost:8000/api/auth/password-reset', {
            method: 'POST', 
            body: JSON.stringify({
                email
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
        if(result.message === "Check your mail") {
            setClass("alert alert-success");
            setTimeout(() => window.location.href="/", 1200);
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
            <h1>Відновити пароль</h1>
            <p>Підтведження буде надіслано на ваш емейл</p>
            <input type = "email" value = {email} onChange={(e)=>setEmail(e.target.value)} className = "form-control" placeholder = "емейл"></input>
            <br/>
            <button onClick = {toReset} className = "btn btn-primary">Відновити пароль</button>
            {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
        </div>
    )
}

export default ResetPassword;