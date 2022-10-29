import React, { useState, useEffect } from 'react';
import {VContent, pageTimeLine, VTimeLineDate, mainDiv, VH3, VContentPoint, postMeta, btnAddPost, btnAddPostIcon, btnAddPostText} from '../Styled/StyledPosts';
import {getCookie} from '../getCookie';
import './Users.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'

function User() {

    const [data, setData] = useState([]);
    const [err, setErr] = useState([]);
    const [classes, setClass] = useState("");

    const [pageCount, setPageCount] = useState(0);

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const token = getCookie("token");
    const login = getCookie("login");

    useEffect(() => {
        fetch(`http://localhost:8000/users`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
            .then(res => {
                console.log("res", res)
                res.map(({ countUsers }) =>
                    setPageCount(countUsers)
                )
                
            })
            console.log("count", pageCount)
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/users?page=1&limit=10`, {
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


    async function toDeleteUsers(id) {
        let isDelete = window.confirm("Are you sure to delete this users?");
        if(isDelete) {
            await fetch(`http://localhost:8000/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("Users has been deleted!")
                window.location.href="/users"
            })
        }
    }
    const [searchData, setSearchData] = useState([]);


    async function search(value) {

        let res = await fetch(`http://localhost:8000/users/search/${value}`);
        res = await res.json();
        if(res.length === 0 || res.message == 'Not found') {
            setErr([`Not found -  ${value}`]);
            setClass("alert alert-danger");
        }
        else {
            setErr([])
        }
        setSearchData(res);
    }
    
    useEffect(() => {
        if (userRole === 'admin') {
            window.location.href="/";
        }
    }, []);

    const paginateUsers = async (currentPage) => {
        console.log(currentPage)
        const res = await fetch(`http://localhost:8000/users/?page=${currentPage}&limit=10`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
       const data = await res.json();
       return data;
    }


    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1
        const postsFromServer = await paginateUsers(currentPage);
        setData(postsFromServer)
    }



    return(
        <mainDiv>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h1>Усі користувачи</h1>
            {
            isUserLoggedIn ?
            <button style = {{width: "25%"}} type="button" class="button" onClick={() => {window.location.href="/addUser"}}>
                <span class="button__text">Додати користувача</span>
                <span class="button__icon">
                    <i class="fa fa-download"></i>
                </span>
            </button>
            : <></>
            }
            <br/>
            <input  style = {{marginRight: "25px"}} id = "searchField" onChange = {(e)=>search(e.target.value)} type = "text" class = "form-control" placeholder='Пошук...'/>
            {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
            {
                (searchData.length !== 0) && (Array.isArray(searchData)) ?
                searchData.map(({ login,email, fullName,rating,role, _id, userPhoto }) =>
                <div>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
                <section class="search-result-item">
                <a class="image-link" href="#">
                {
                    (userPhoto !== 'not set') && (userPhoto !== undefined) ?
                    <>
                    <img src={require(`../../${userPhoto.substring(19,userPhoto.length).replace(/\\/g, "/")}`)} alt="" class="rounded-circle" width="40" height="40"/>
                    </> 
                    :
                    <img src={require('../../uploads/defaultUserPhoto.jpg')} alt="" class="rounded-circle" width="40" height="40"/>
                }
                </a>
                   <div class="search-result-item-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <h4 class="search-result-item-heading"><a href="#">{login}</a></h4>
                            <p class="info">{email}</p>
                            <p class="info">Повне ім'я: {fullName}</p>
                            <p class="description">
                                <p>id: {_id}</p>
                                <p>рейтінг: {rating}</p>
                            </p>
                        </div>
                        <div class="col-sm-3 text-align-center">
                            <p class="value3 mt-sm">{role}</p>
                        </div>
                        <button onClick = {() => toDeleteUsers(_id)}   type="button" class="btn btn-danger">Видалити</button>
                        <button onClick={() => {window.location.href="updateUser/"+_id}}  type="button" class="btn btn-warning">Змінити</button>
 
                    </div>
                </div>
                </section>
                </div>
                )
                :
                data.map(({ login,email, fullName,rating,role, _id, userPhoto }) =>
                <div>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
                <section class="search-result-item">
                <a class="image-link" href="#">
                {
                    (userPhoto !== 'not set') && (userPhoto !== undefined) ?
                    <>
                    <img src={require(`../../${userPhoto.substring(19,userPhoto.length).replace(/\\/g, "/")}`)} alt="" class="rounded-circle" width="40" height="40"/>
                    </> 
                    :
                    <img src={require('../../uploads/defaultUserPhoto.jpg')} alt="" class="rounded-circle" width="40" height="40"/>
                }
                </a>
                  <div class="search-result-item-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <h4 class="search-result-item-heading"><a href="#">{login}</a></h4>
                            <p class="info">{email}</p>
                            <p class="info">Повне ім'я: {fullName}</p>
                            <p class="description">
                                <p>id: {_id}</p>
                                <p>рейтінг: {rating}</p>
                            </p>
                        </div>
                        <div class="col-sm-3 text-align-center">
                            <p class="value3 mt-sm">{role}</p>
                        </div>
                        <button style={{display: "inline-block", float: "right", margin: "3px"}} id = "btn" onClick = {() => toDeleteUsers(_id)}   type="button" class="btn btn-danger">Видалити</button>
                        <button style={{display: "inline-block", float: "right", margin: "3px"}} id = "btn" onClick={() => {window.location.href="updateUser/"+_id}}  type="button" class="btn btn-warning">Змінити</button>
  
                    </div>
                </div>
                </section>
                </div>
                )
            }
            <ReactPaginate
            previousLabel = {'previous'}
            nextLabel = {'next'}
            breakLabel = {'...'}
            pageCount = {pageCount / 10}
            marginPagesDisplayed = {2}
            pageRangeDisplayed = {3}
            onPageChange = {handlePageClick}
            containerClassName = {'pagination justify-content-center'}
            pageClassName = {'page-item'}
            pageLinkClassName = {'page-link'}
            previousClassName = {'page-item'}
            previousLinkClassName = {'page-link'}
            nextClassItem = {'page-item'}
            nextLinkClassName = {'page-link'}
            breakClassName = {'page-item'}
            breakLinkClassName = {'page-link'}
            activeClassName = {'active'}
            />       
        </mainDiv>
    )
}

export default User;