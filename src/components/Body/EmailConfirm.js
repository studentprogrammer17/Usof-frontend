import React, { useState } from 'react';
import { useParams } from "react-router-dom";


function EmailConfirm() {
    const {token} = useParams();
    const [err, setErr] = useState([]);
    const [classes, setClass] = useState("");
    async function toConfirm() {
        let errorsA = [];
        let result = await fetch(`http://localhost:8000/api/auth/email-confirmation/${token}`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
            },
        });
        result = await result.json();
        if(result.message === "Емейл підтверджен") {
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
    toConfirm();
    return(
        <div style = {{marginTop: "100px", marginBottom: "100px"}} className = "col-sm-6 offset-sm-3">
            {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
        </div>
    )
}

export default EmailConfirm;