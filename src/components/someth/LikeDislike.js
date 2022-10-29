import React, { useEffect, useState } from 'react'
import withRouter from '../withRouter'
import {getCookie} from '../getCookie';
import './LikeDislike.css';
import Axios from 'axios'


function LikeDislike(props) {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
    const token = getCookie("token");
    const login = getCookie("login");

    let variable = {};

    if (props.post) {
        variable = { postId: props.postId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    
    // useEffect(async () => {
    //     if (token) {
    //        await fetch(`http://localhost:8000/api/auth/check-token/${token}`, {
    //             method: 'GET', 
    //             mode: 'cors', 
    //             cache: 'no-cache',
    //             credentials: 'same-origin',
    //             headers: {
    //               'Content-Type': 'application/json',
    //               "Accept": "application/json"
    //             },
    //         })
    //         .then((res) => res.json())
    //         .then(function(response){           
    //             setisUserLoggedIn(() => response.text);           
    //         });   
    //     }
    // }, [])



    useEffect(() => {
        Axios.post('http://localhost:8000/posts/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length)
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } 
                else {
                    console.log('Failed to get likes')
                }
            })

        Axios.post('http://localhost:8000/posts/getDislikes', variable)
            .then(response => {
                console.log('getDislike',response.data)
                if (response.data.success) {
                    setDislikes(response.data.dislikes.length)
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } 
                else {
                    console.log('Failed to get dislikes')
                }
            })
    }, [])


    const onLike = () => {
        if(!props.isUserLoggedIn) return false;
        if (LikeAction === null) {
            Axios.post('http://localhost:8000/posts/upLike', variable)
                .then(response => {
                    console.log("res", response)
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } 
                    else {
                        console.log('Failed to increase the like')
                    }
                })
        } 
        else {
            Axios.post('http://localhost:8000/posts/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } 
                    else {
                        console.log('Failed to decrease the like')
                    }
                })
        }
    }


    const onDisLike = () => {
        if(!props.isUserLoggedIn) return false;
        if (DislikeAction !== null) {
            Axios.post('http://localhost:8000/posts/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } 
                    else {
                        console.log('Failed to decrease dislike')
                    }
                })
        } 
        else {
            Axios.post('http://localhost:8000/posts/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } 
                    else {
                        console.log('Failed to increase dislike')
                    }
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                {
                props.postId ? 
                <i  style = {(LikeAction === 'liked') && login ? {color:"blue", cursor: "pointer"} : {color:"black",  cursor: "pointer"}} onClick = {onLike}  class="fa fa-thumbs-up"></i>
                :
                <i  style = {(LikeAction === 'liked') && login ? {color:"blue", cursor: "pointer"} : {color:"white",  cursor: "pointer"}} onClick = {onLike}  class="fa fa-thumbs-up"></i>
                }
                
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>

            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                {
                props.postId ? 
                <i style = {(DislikeAction === 'disliked') && login ? {color:"blue",  cursor: "pointer"} : {color:"black",  cursor: "pointer"}} onClick = {onDisLike}  class="fa fa-thumbs-down"></i>
                :
                <i style = {(DislikeAction === 'disliked') && login ? {color:"blue",  cursor: "pointer"} : {color:"white",  cursor: "pointer"}} onClick = {onDisLike}  class="fa fa-thumbs-down"></i>
                }
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default withRouter(LikeDislike);
