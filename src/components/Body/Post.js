import React, { useState, useEffect } from 'react';
import {VContent, pageTimeLine, VTimeLineDate, mainDiv, VH3, VContentPoint, postMeta, btnAddPost, btnAddPostIcon, btnAddPostText} from '../Styled/StyledPosts';
import {getCookie} from '../getCookie';
import './Post.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import LikeDislike from '../someth/LikeDislike'

function Post() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [err, setErr] = useState([]);
    const [classes, setClass] = useState("");
    const [toSort, setSort] = useState("");
    const [totalPosts, settotalPosts] = useState("");

    const [CategoyData, setCategoryData] = useState([]);
    const [categories, setCategories] = useState();

    const [pageCount, setPageCount] = useState(0);

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const token = getCookie("token");
    const login = getCookie("login");

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
        fetch(`http://localhost:8000/categories`)
        .then(res => res.json())
            .then(res => {
                setCategoryData(res)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/posts`)
        .then(res => res.json())
            .then(res => {
                res.map(({ countPosts }) =>
                    setPageCount(countPosts)
                )
                
            })
    }, [])


    useEffect(() => {
        fetch(`http://localhost:8000/posts/?sort=-publishDate&page=1&limit=10`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
            .then(res => {
                console.log("total", res);
              setData(res)
        })
      }, [])





    async function toDeletePost(id) {
        let isDelete = window.confirm("???? ????????????????, ???? ???????????? ???????????????? ?????? ?????????");
        if(isDelete) {
            await fetch(`http://localhost:8000/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("???????? ??????????????")
                window.location.href="/"
            })
        }
    }

    async function toDeactivePost(id) {
        let isDeactive = window.confirm("???? ????????????????, ???? ???????????? ???????????????????????? ?????? ?????????");
        if(isDeactive) {
            await fetch(`http://localhost:8000/posts/${id}/inactive`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("???????? ????????????????????")
                window.location.href="/"
            })
        }
    }

    async function toActivePost(id) {
        let isDeactive = window.confirm("???? ????????????????, ???? ???????????? ???????????????????? ?????? ?????????");
        if(isDeactive) {
            await fetch(`http://localhost:8000/posts/${id}/active`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                alert("???????? ????????????????")
                window.location.href="/"
            })
        }
    }

    


    async function search(value) {

        let res = await fetch(`http://localhost:8000/posts/search/${value}`);
        res = await res.json();
        if(res.length === 0 || res.message == 'Not found') {
            setErr([`???? ???????????????? -  ${value}`]);
            setClass("alert alert-danger");

            fetch(`http://localhost:8000/posts/?sort=-publishDate&page=1&limit=10`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
                .then(res => {
                    console.log("total", res);
                  setData(res)
            })

        }
        else {
            setErr([]);
        }
        setSearchData(res);
    }
    

    async function sortFunction(value) {
        setSort(value);
        fetch(`http://localhost:8000/posts/?sort=${value}publishDate`, {
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
    }

    async function filterFunction(value) {
        setCategories(value);
        if(value !== '??????') {
            fetch(`http://localhost:8000/posts/?sort=${toSort}publishDate&categories=${value}`, {
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
        }
        else {
            fetch(`http://localhost:8000/posts/?sort=-publishDate`, {
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
        }
    }

    const paginatePosts = async (currentPage) => {
        console.log(currentPage)
        const res = await fetch(`http://localhost:8000/posts/?sort=-publishDate&page=${currentPage}&limit=10`, {
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
        const postsFromServer = await paginatePosts(currentPage);
        setData(postsFromServer)
    }


    return(
        <mainDiv>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h1>?????? ??????????</h1>
            {
            isUserLoggedIn ?
            <button style = {{width: "25%"}} type="button" class="button" onClick={() => {window.location.href="/addpost"}}>
                <span class="button__text">???????????? ????????</span>
                <span class="button__icon">
                    <i class="fa fa-download"></i>
                </span>
            </button>
            : <></>
            }
            <br/>
            <input id = "searchField" onChange = {(e)=>search(e.target.value)} type = "text" class = "form-control" placeholder='??????????...'/>
            {err.map((elem, index) => (
                <div class={classes} role="alert" key={ `${index + 1}err` }>
                    {elem}
                </div>
            ))}
            <select value={toSort} onChange={(e) => sortFunction(e.target.value)} class = "sortSelect" name="sort" id="select">
                <option selected value="dis" disabled>???????????????????? ????????????</option>
                <option id = "New" value="-">?????? ?????????? ???? ????????????</option>
                <option id = "Old" value="+">?????? ???????????? ???? ??????????</option>
            </select>
            <br/>
            <select style = {{margin: "10px"}} value={categories} 
              onChange={(e) => filterFunction(e.target.value)}>
            <option disabled>?????????????? ??????????????????</option>
            <option selected value='??????'>??????</option>
                {
                    CategoyData.map(({ title, _id }) =>
                        <>
                        <option value={title}>{title}</option>
                        </>
                    )
                }
            </select>
            {
                (searchData.length !== 0) && (Array.isArray(searchData)) ?
                searchData.map(({ author,title, status, content,publishDate,categories, postPhoto, _id }) =>
                <div>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
                <div class="container mb80">
                    <pageTimeLine>
                        <VContentPoint>
                            <div class="vtimeline-block">
                                <VContent>
                                    <div style={{whiteSpace: "nowrap",overflowX: "auto",overflowY: "hidden"}}>
                                    <a style={{display: "inline-block"}}  href={"post/"+_id}><VH3>{title}</VH3></a>
                                    {
                                    (isUserLoggedIn && login === author) || userRole === 'admin' ? 
                                    <>
                                    <button onClick = {() => toDeletePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}}  type="button" class="btn btn-danger">????????????????</button>
                                    <button onClick={() => {window.location.href="updatePost/"+_id}} style={{display: "inline-block", float: "right", margin: "3px"}} type="button" class="btn btn-warning">??????????????</button>
                                    {
                                        status === 'Active' ?
                                        <button onClick = {() => toDeactivePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}} title = '???????????????????????? ????????' type="button" class="btn btn-secondary">&#10060;</button>
                                        :
                                        <>
                                        <button onClick = {() => toActivePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}} title = '???????????????????? ????????' type="button" class="btn btn-success">&#9989;</button>
                                        <h2 style={{display: "inline-block",float: "right", fontSize: "18px"}}>
                                            ???????? ????????????????????!
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
                                    <a class="image-link" href={"post/"+_id} style = {{float: "left", display: "inline-block", marginBottom: "20px", marginTop: "20px"}}>                                    
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
                                            <i class="fa fa-user-circle-o"></i> <a href={"posts/"+author}>{author}</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-calendar-o"></i> <a href="#">{new Date(publishDate).toLocaleDateString("en-US")}</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-tags"></i> <a href="#">{categories}</a>
                                        </li>
                                    </postMeta>
                                    <p>
                                    <p style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{content}</p>
                                    </p><br/>
                                    <a href={"post/"+_id} class="btn btn-outline-secondary btn-sm">????????????</a>
                                    <a href={"post/"+_id} class="btn btn-outline-secondary btn-sm" style = {{marginLeft: "5px", backgroundColor: "yellow"}}>??????????????????</a>
                                    <LikeDislike post postId={_id} userId={login} isUserLoggedIn={isUserLoggedIn}/>
                                </VContent>
                            </div>
                        </VContentPoint>
                    </pageTimeLine>
                </div>
                </div>
                )
                :
                data.map(({ author,title, content,publishDate,categories, postPhoto, status, _id }) =>
                <div>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
                <div class="container mb80">
                    <pageTimeLine>
                        <VContentPoint>
                            <div class="vtimeline-block"> 
                            {
                                status === 'Inactive' && (userRole === 'user' || !isUserLoggedIn) ? <></>
                                :
                                <VContent>
                                    <div style={{whiteSpace: "nowrap",overflowX: "auto",overflowY: "hidden"}}>
                                    <a style={{display: "inline-block"}}  href={"post/"+_id}><VH3>{title}</VH3></a>
                                    {
                                    (isUserLoggedIn && login === author) || userRole === 'admin' ? 
                                    <>
                                    <button onClick = {() => toDeletePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}}  type="button" class="btn btn-danger">????????????????</button>
                                    <button onClick={() => {window.location.href="updatePost/"+_id}} style={{display: "inline-block", float: "right", margin: "3px"}} type="button" class="btn btn-warning">??????????????</button>
                                    {
                                        status === 'Active' ?
                                        <button onClick = {() => toDeactivePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}} title = '???????????????????????? ????????' type="button" class="btn btn-secondary">&#10060;</button>
                                        :
                                        <>
                                        <button onClick = {() => toActivePost(_id)} style={{display: "inline-block", float: "right", margin: "3px"}} title = '???????????????????? ????????' type="button" class="btn btn-success">&#9989;</button>
                                        <h2 style={{display: "inline-block",float: "right", fontSize: "18px"}}>
                                            ???????? ????????????????????!
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
                                    <a class="image-link" href={"post/"+_id} style = {{float: "left", display: "inline-block", marginBottom: "20px", marginTop: "20px"}}>                                    
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
                                            <i class="fa fa-user-circle-o"></i> <a href={"posts/"+author}>{author}</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-calendar-o"></i> <a href="#">{new Date(publishDate).toLocaleDateString("en-US")}</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-tags"></i> <a href="#">{categories}</a>
                                        </li>
                                    </postMeta>
                                    <p>
                                    <p style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{content}</p>
                                    </p><br/>
                                    <a href={"post/"+_id} class="btn btn-outline-secondary btn-sm">????????????</a>
                                    <a href={"post/"+_id} class="btn btn-outline-secondary btn-sm" style = {{marginLeft: "5px", backgroundColor: "yellow"}}>??????????????????</a>
                                    <LikeDislike post postId={_id} userId={login} isUserLoggedIn={isUserLoggedIn}/>
                                </VContent>
                            }
                            </div>
                        </VContentPoint>
                    </pageTimeLine>
                </div>
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

export default Post;