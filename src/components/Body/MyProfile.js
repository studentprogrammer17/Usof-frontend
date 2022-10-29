import React, { useState, useEffect } from 'react';
import {VContent, pageTimeLine, VTimeLineDate, mainDiv, VH3, VContentPoint, postMeta, btnAddPost, btnAddPostIcon, btnAddPostText} from '../Styled/StyledPosts';
import {getCookie} from '../getCookie';
import './MyProfile.css';

function MyProfile() {

    const [data, setData] = useState([]);
    const [rating, setRating] = useState([]);

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const token = getCookie("token");
    const login = getCookie("login");

    useEffect(() => {
        fetch(`http://localhost:8000/users/login/${login}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/users/${login}/getLikes`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
            .then(res => {
                setRating(res)
            })
    }, [])

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


    async function toDeleteUsers(id) {
        let isDelete = window.confirm("Ви впевнені, що хочете видалили акаунт?");
        if(isDelete) {
            await fetch(`http://localhost:8000/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("Ви видалили акаунт!")
                var cookies = document.cookie.split(";");
    
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
                window.location.href="/";
            })
        }
    }


    return(
        <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
        {
        data.map(({ login,email, fullName,role, _id, userPhoto }) =>
        <div class="card p-4"> 
            <div class=" image d-flex flex-column justify-content-center align-items-center"> 
                <button class="btn2 btn-secondary"> 
                {
                    (userPhoto !== 'not set') && (userPhoto !== undefined) ?
                    <>
                    <img src={require(`../../${userPhoto.substring(19,userPhoto.length).replace(/\\/g, "/")}`)} alt="" class="rounded-circle" width="100" height="100"/>
                    </> 
                    :
                    <img src={require('../../uploads/defaultUserPhoto.jpg')} alt="" class="rounded-circle" width="100" height="100"/>
                }
               </button> 
               <span class="name mt-3">{login}</span> 
               <span class="idd">{email}</span> 
               <div class="d-flex flex-row justify-content-center align-items-center gap-2"> 
                   <span class="idd1">Ім'я: {fullName}</span>
                   <span><i class="fa fa-copy"></i></span> 
               </div>
                    {
                        rating.map(({ likes,dislikes,rating}) =>
                        <div>
                        <span class="number">{rating} <span class="follow">Рейтінг</span></span>
                        <p>Всього лайків на постах: {likes}</p>
                        <p>Всього дізлайків на постах: {dislikes}</p>
                        </div> 
                        )
                    }
               <div> 
                   <button onClick={() => {window.location.href="updateUser/"+_id}}  class="btn1 btn-dark">Змінити профіль</button>
                   <br/>
                   <button style={{display: "inline-block", float: "center", margin: "3px"}} id = "btn" onClick = {() => toDeleteUsers(_id)}   type="button" class="btn btn-danger">Видалити</button>
               </div> 
           </div>
       </div>
    )}
   </div>
    )
}

export default MyProfile;