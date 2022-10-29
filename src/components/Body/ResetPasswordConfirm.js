import React, { useState } from 'react';
import { useParams } from "react-router-dom";


function ResetPaswordConfirm() {
    const {token} = useParams();
    const [err, setErr] = useState([]);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [classes, setClass] = useState("");

    async function toReset() {
        let errorsA = [];
        let result = await fetch(`http://localhost:8000/api/auth/password-reset/${token}`, {
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify({
                newPassword,
                newPasswordConfirm
            }),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
            },
        });
        result = await result.json();
        if(result.message === "Password has to have: one lowercase, uppercase, digit and at least 6 length" ||result.message === "Passwords do not match") {
            setClass("alert alert-danger");
        }
        else {
            setClass("alert alert-success");
            window.location.href="/login";
        }
        errorsA.push(result.message)
        setErr(errorsA);
    }
    return(
        <div className = "col-sm-6 offset-sm-3">
            <h1>Come up with new password</h1>
            <input type = "password" value = {newPassword} onChange={(e)=>setNewPassword(e.target.value)} className = "form-control" placeholder = "Новий пароль"></input>
            <br/>
            <input type = "password" value = {newPasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)} className = "form-control" placeholder = "Підтвердити новий пароль"></input>
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

export default ResetPaswordConfirm;