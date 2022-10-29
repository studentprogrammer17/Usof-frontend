import React, { useEffect,useState } from 'react';
import { getCookie } from '../getCookie';
import { useNavigate } from 'react-router-dom';
import withRouter from '../withRouter'
import './Post.css';


function UpdateUser(props) {
    const userId = props.router.params.userId

    const [login, setLogin] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState();
    const [userPhoto, setUserPhoto] = useState("");

    const [checkAuth, setAuth] = useState(false);
    const [err, setErr] = useState([]);
    const [classes, setClass] = useState("");
    const [data, setData] = useState([]);
    const [userRole, setUserRole] = useState("");
    let errorsA = [];
    const navigate = useNavigate();

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const token = getCookie("token");
    const author = getCookie("login");


    async function toUpdateUser() {

        if(userPhoto) {
            const formData = new FormData();
            formData.append("userPhoto", userPhoto)
            await fetch(`http://localhost:8000/users/avatar/${userId}`, {
                method: 'PATCH', 
                body: formData,
                mode: 'cors', 
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                "Authorization": `Bearer ${token}`
                },
            });
        }


        let bodyElement = {};
        if(login) bodyElement.login = login;
        if(fullName) bodyElement.fullName = fullName;
        if(email) bodyElement.email = email;
        if(password) bodyElement.password = password;
        if(confirmPassword) bodyElement.confirmPassword = confirmPassword;
        if(role) bodyElement.role = role;
        console.log(bodyElement)
        await fetch(`http://localhost:8000/users/${userId}`, {
            method: 'PATCH', 
            body: JSON.stringify(bodyElement),
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
          setErr(() => [result1.message]);

          if(result1.message === "Дані поновлені") {
            setClass("alert alert-success");
            userRole === 'admin' ? 
            setTimeout(() => window.location.href="/users", 1200)
            :
            setTimeout(() => window.location.href="/myprofile", 1200)
          }
          else {
            setClass("alert alert-danger");
          }
        });
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

  
  useEffect(() => {
    let login = getCookie("login")
    if (isUserLoggedIn || login) {
      console.log("a")
    }
    else {
      window.location.href="/"
    }
    }, []);

    return(
        <div className = "col-sm-6 offset-sm-3">
            {
            isUserLoggedIn ? 
            <>
            <h1>Відновити юзера</h1>
            <input type = "text" value = {login} onChange={(e)=>setLogin(e.target.value)} className = "form-control" placeholder = "Логін"></input>
            <br/>
            <input type = "text" value = {fullName} onChange={(e)=>setFullName(e.target.value)} className = "form-control" placeholder = "Повне ім'я"></input>
            <br/>
            <input type = "email" value = {email} onChange={(e)=>setEmail(e.target.value)} className = "form-control" placeholder = "емейл"></input>
            <br/>
             <input
            type="file"
            name="myImage"
            style = {{marginBottom: "5px", marginRight: "-5px"}}
            onChange={(event) => {
            setUserPhoto(event.target.files[0]);
            }}
            />
            <br/>
            {
            userRole === 'admin' ? 
            <select style = {{margin: "10px", float: "left"}} value={role} onChange={(e) => setRole(e.target.value)}>
                <option disabled>Роль користувача</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>
            : <></>
            }
            <br/>
            <input type = "password" value = {password} onChange={(e)=>setPassword(e.target.value)} className = "form-control" placeholder = "пароль"></input>
            <br/>
            <input type = "password" value = {confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className = "form-control" placeholder = "підтвердити пароль"></input>
            <br/>
            <button onClick = {toUpdateUser} className = "btn btn-primary">Відновити</button>
            <br/>
             {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
            </>
            :
            <>
                <div class="loader"></div>
            </>
            }
        </div>
    )
}

export default withRouter(UpdateUser);