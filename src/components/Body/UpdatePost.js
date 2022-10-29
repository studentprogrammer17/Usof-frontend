import React, { useEffect,useState } from 'react';
import { getCookie } from '../getCookie';
import { useNavigate } from 'react-router-dom';
import withRouter from '../withRouter'
import './Post.css';


function UpdatePost(props) {
    const postId = props.router.params.postId
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState();
    const [title, setTitle] = useState("");
    const [postPhoto, setPostPhoto] = useState("");

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

    useEffect(() => {
        fetch(`http://localhost:8000/categories`)
        .then(res => res.json())
            .then(res => {
              setData(res)
            })
    }, [])
    

    async function toPost() {

      if(postPhoto) {
        const formData = new FormData();
        formData.append("postPhoto", postPhoto)
        await fetch(`http://localhost:8000/posts/postPhoto/${postId}`, {
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
    if(title) bodyElement.title = title;
    if(content) bodyElement.content = content;
    if(categories) bodyElement.categories = categories;


        await fetch(`http://localhost:8000/posts/${postId}`, {
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
          console.log(categories)
          setErr(() => [result1.message]);

          if(result1.message === "Пост змінено") {
            setClass("alert alert-success");
            setTimeout(() => window.location.href="/", 1200);
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
            <h1>Відновити пост</h1>
            <input type = "text" value = {title} onChange={(e)=>setTitle(e.target.value)} className = "form-control" placeholder = "Назва"></input>
            <br/>
            <textarea maxlength="300" value = {content} onChange={(e)=>setContent(e.target.value)} className = "form-control" placeholder = "Контент" class="form-control" rows="3" ></textarea>
            <br/>
            <input
            type="file"
            name="myImage"
            style = {{marginBottom: "5px", marginRight: "-5px"}}
            onChange={(event) => {
            setPostPhoto(event.target.files[0]);
            }}
            />
            <br/>
            <select style = {{margin: "10px"}} value={categories} 
              onChange={(e) => setCategories(e.target.value)}>
            <option disabled>Оберіть категорію</option>
                {
                    data.map(({ title, _id }) =>
                        <>
                        <option value={title}>{title}</option>
                        </>
                    )
                }
            </select>
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

export default withRouter(UpdatePost);