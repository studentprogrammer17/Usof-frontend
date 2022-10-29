import React, { useState, useEffect } from 'react';
import {VContent, pageTimeLine, VTimeLineDate, mainDiv, VH3, VContentPoint, postMeta, btnAddPost, btnAddPostIcon, btnAddPostText} from '../Styled/StyledPosts';
import {getCookie} from '../getCookie';
import './Post.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import withRouter from '../withRouter'
import LikeDislike from '../someth/LikeDislike'

function CurrentPost(props) {
    const postId = props.router.params.postId
    const [content, setContent] = useState("");
    const [data, setData] = useState([]);
    const [dataComments, setDataComments] = useState([]);
    const [err, setErr] = useState([]);
    const [classes, setClass] = useState("");
    const [isChangedComment, setChangedComment] = useState(false);
    const [emptyAddComm, setEmptyAddComm] = useState(false);
    const [commentId,setCommentId] = useState("");

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const token = getCookie("token");
    const login = getCookie("login");
    const author = login;

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}/comments/?sort=-publishDate`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
            .then(res => {
                setDataComments(res)
            })
      }, [])


      useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
            .then(res => {
              setData(res)
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

    
    async function toDeleteComment(id) {
        let isDelete = window.confirm("Ви впевені, що хочете видалить коментарій?");
        if(isDelete) {
            await fetch(`http://localhost:8000/comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("Коментар видалено");
                window.location.href=`http://localhost:3000/post/${postId}`;
            })
        }
    }

    function toChangeCommentTemp(id) {
        setChangedComment(true);
        setCommentId(id);
    }

    function DontSaveComment() {
        setTimeout(() => window.location.href=`/post/${postId}`, 100);
    }

    async function toChangeComment(id) {
        await fetch(`http://localhost:8000/comments/${commentId}`, {
            method: 'PATCH', 
            body: JSON.stringify({
                content,
                publishDate: new Date()
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
          if(content.length === 0) {
            setEmptyAddComm(true)
          }
          if(result1.message === "Коментар змінено!") {
            setEmptyAddComm(false)
            setChangedComment(false);
            setErr(() => [result1.message]);
            setClass("alert alert-success");
            setTimeout(() => window.location.href=`/post/${postId}`, 1200);
          }
          else {
            setErr(() => [result1.message]);
            setClass("alert alert-danger");
          }
        });
    }

    async function toDeletePost(id) {
        let isDelete = window.confirm("Ви впевнені, що хочете видалити пост?");
        if(isDelete) {
            await fetch(`http://localhost:8000/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("Пост видален!")
            })
        }
    }

    async function toDeactivePost(id) {
        let isDeactive = window.confirm("Ви впевнені, що хочете деактивувати цей пост?");
        if(isDeactive) {
            await fetch(`http://localhost:8000/posts/${id}/inactive`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("Пост неактивний")
                window.location.href="/"
            })
        }
    }

    async function toActivePost(id) {
        let isDeactive = window.confirm("Ви впевнені, що хочете активувати цей пост?");
        if(isDeactive) {
            await fetch(`http://localhost:8000/posts/${id}/active`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("Пост активний")
                window.location.href="/"
            })
        }
    }


    async function addComment() {
        await fetch(`http://localhost:8000/posts/${postId}/comments`, {
            method: 'POST', 
            body: JSON.stringify({
                content
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
          if(content.length === 0) {
            setEmptyAddComm(true)
          }
          
          if(result1.message === "Коментар створено") {
            setEmptyAddComm(false)
            setErr(() => [result1.message]);
            setClass("alert alert-success");
            setTimeout(() => window.location.href=`/post/${postId}`, 1200);
          }
          else {
            setErr(() => [result1.message]);
            setClass("alert alert-danger");
          }
        });
    }

    return(
        <mainDiv>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            {
                data.map(({ author,title, status, content,publishDate,categories, postPhoto, _id }) =>
                <div>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
                <div class="container mb80">
                    <pageTimeLine>
                        <VContentPoint>
                            <div class="vtimeline-block" id = "vtimeline-block">
                                <VContent>
                                    <div style={{whiteSpace: "nowrap",overflowX: "auto",overflowY: "hidden"}}>
                                    <a style={{display: "inline-block"}}  href={"post/"+_id}><VH3>{title}</VH3></a>
                                    {
                                    (isUserLoggedIn && login === author) || userRole === 'admin' ? 
                                    <>
                                    <button onClick = {() => toDeletePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}}  type="button" class="btn btn-danger">Видалити</button>
                                    <button onClick={() => {window.location.href="updatePost/"+_id}} style={{display: "inline-block", float: "right", margin: "3px"}} type="button" class="btn btn-warning">Змінити</button>
                                    {
                                        status === 'Active' ?
                                        <button onClick = {() => toDeactivePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}} title = 'Деактивувати пост' type="button" class="btn btn-secondary">&#10060;</button>
                                        :
                                        <>
                                        <button onClick = {() => toActivePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}} title = 'Активувати пост' type="button" class="btn btn-success">&#9989;</button>
                                        <h2 style={{display: "inline-block",float: "right", fontSize: "18px"}}>
                                            Пост неактивний!
                                        </h2>
                                        </>
                                    }
                                    </>
                                    :
                                    <></>
                                    }
                                    <br/>
                                    {
                                    postPhoto ?            
                                    <a class="image-link" href="#" style = {{float: "left", display: "inline-block", marginBottom: "20px", marginTop: "20px"}}>                                    
                                        <>
                                        <img src={require(`../../${postPhoto.substring(19,postPhoto.length).replace(/\\/g, "/")}`)} alt="" width="150" height="150"/>
                                        </> 
                                    </a>
                                    :
                                    <></>
                                    }
                                    </div>
                                    <p>{new Date(publishDate).toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'})}</p>
                                    <postMeta>
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-circle-o"></i> <a href="#">{author}</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-calendar-o"></i> <a href="#">{new Date(publishDate).toLocaleDateString("en-US")}</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-tags"></i> <a href="#">{categories}</a>
                                        </li>
                                    </postMeta>
                                    <p>
                                    <p style={{height: "150px"}}>{content}</p>
                                    </p>
                                    <LikeDislike post postId={_id} userId={login} isUserLoggedIn={isUserLoggedIn}/>
                                </VContent>
                            </div>
                        </VContentPoint>
                    </pageTimeLine>
                </div>
                </div>
                )
            }

            <h1>Коментарі ({dataComments.length})</h1>
            {
            isUserLoggedIn && (isChangedComment === false) ? 
            <div class = "textAreaComment">
                <textarea style = {{resize: "none"}} maxlength="100" value = {content} onChange={(e)=>setContent(e.target.value)} className = "form-control" placeholder = "Ваш коментар...." class="form-control" rows="2" ></textarea>
                <button style = {{ margin: "20px"}} onClick = {addComment} className = "btn btn-primary">Опублікувати</button>
            </div>
            :
            isUserLoggedIn ?  
            <div class = "textAreaComment"> 
                <textarea id = "txtAreaOfChanged" style = {{resize: "none"}} maxlength="100" onChange={(e)=>setContent(e.target.value)} placeholder = "Ваш коментар...." className = "form-control"  class="form-control" rows="2" ></textarea>
                <button style = {{ margin: "20px"}} onClick = {toChangeComment} className = "btn btn-primary">Зберегти</button>
                <button style = {{ margin: "20px"}} onClick = {DontSaveComment} className = "btn btn-danger">Не Зберегати</button>
            </div>
            : <></>
            } 
            {
            !emptyAddComm ? 
            err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))
            : 
            <div class={classes} role="alert">
                Додайте хоч щось
            </div>
            }
            <br/>
            {
                dataComments.map(({ content,publishDate,author,userPhoto, id, edited }) =>
                <div class="container">
                    <div class="darker">
                        {

                        userPhoto !== 'not set' && userPhoto !== undefined ?
                        <>
                        <img src={require(`../../${userPhoto.substring(19,userPhoto.length).replace(/\\/g, "/")}`)} alt="" class="rounded-circle" width="40" height="40"/>
                        </> 
                        :
                        <>
                        <img src={require('../../uploads/defaultUserPhoto.jpg')} alt="" class="rounded-circle" width="40" height="40"/>
                        </>
                        }
                        <h4 class = "authorComment">{author}</h4>
                        <span>{new Date(publishDate).toLocaleDateString("en-US")}</span>
                        {
                                    (isUserLoggedIn && login === author) || userRole === 'admin' ? 
                                    <>
                                    <button onClick = {() => toDeleteComment(id)}  title="Видалити коментар"  type="button" class="btn btnDelcom"><i class="fa fa-close"></i></button>
                                    <a href = "#vtimeline-block">
                                    <button onClick = {() => toChangeCommentTemp(id)}  title="Змінити коментар"  type="button" class="btn btnChangeCom"><i class="fa fa-pencil-square"></i></button>
                                    </a>
                                    </>
                                    :
                                    <></>
                        }
                        <br/>
                        <p>{content}</p>
                        <LikeDislike comment commentId={id} userId={login} isUserLoggedIn={isUserLoggedIn}/>
                        <p>{new Date(publishDate).toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'})}</p>
                        {
                            edited ? <p style = {{color: "grey", float: "right", fontSize: "10px"}}>edited</p> : <></>
                        }
                    </div>
                </div>
                )
            }
        </mainDiv>
    )
}


export default withRouter(CurrentPost);