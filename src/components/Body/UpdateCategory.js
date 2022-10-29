import React, { useEffect,useState } from 'react';
import { getCookie } from '../getCookie';
import { useNavigate } from 'react-router-dom';
import withRouter from '../withRouter'
import './Post.css';


function UpdateCategory(props) {
    const categoryId = props.router.params.catId
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("");

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

    async function toPost() {
        let bodyElement = {};
        if(title) bodyElement.title = title;
        if(content) bodyElement.description = content;

        await fetch(`http://localhost:8000/categories/${categoryId}`, {
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

          if(result1.message === "Категорія змінена") {
            setClass("alert alert-success");
            setTimeout(() => window.location.href="/categories", 1200);
          }
          else {
            setClass("alert alert-danger");
          }
        });
    }




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
            <h1>Відновити категорію</h1>
            <input type = "text" value = {title} onChange={(e)=>setTitle(e.target.value)} className = "form-control" placeholder = "Назва"></input>
            <br/>
            <textarea maxlength="300" value = {content} onChange={(e)=>setContent(e.target.value)} className = "form-control" placeholder = "Контент" class="form-control" rows="3" ></textarea>
            <br/>
            <button onClick = {toPost} className = "btn btn-primary">Відновити</button>
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

export default withRouter(UpdateCategory);