import "./App.css";
import {  Route, Routes, BrowserRouter  } from "react-router-dom";
import Header from './components/Header/Header'
import Footer from "./components/Header/Footer";

import Register from './components/Body/Registration'
import Login from './components/Body/Login'
import EmailConfirm from './components/Body/EmailConfirm'
import ResetPassword from './components/Body/ResetPassword'
import ResetPasswordConfirm from './components/Body/ResetPasswordConfirm'
import Post from './components/Body/Post'
import AddPost from './components/Body/AddPost'
import UpdatePost from "./components/Body/UpdatePost";
import CurrentPost from "./components/Body/CurrentPost";
import MyPosts from "./components/Body/MyPosts";
import UserPosts from "./components/Body/UserPosts";

import Users from "./components/Body/Users";
import AddUser from "./components/Body/AddUser";
import UpdateUser from "./components/Body/UpdateUser";

import Info from "./components/Body/Info";

import Categories from "./components/Body/Categories";
import AddCategory from "./components/Body/AddCategory";
import UpdateCategory from "./components/Body/UpdateCategory";

import MyProfile from "./components/Body/MyProfile";

function App() {

  return (
    <div className="App">
          <Header />
          <BrowserRouter>
            <Routes>
            <Route path="/info" element={<Info/>} />

            <Route path="/myprofile" element={<MyProfile/>} />

            <Route path="/categories" element={<Categories/>} />
            <Route path="/addCategory" element={<AddCategory/>} />
            <Route path="/updateCategory/:catId" element={<UpdateCategory/>} />

              <Route path="/users" element={<Users/>} />
              <Route path="/addUser" element={<AddUser/>} />
              <Route path="/posts/:userLogin" element={<UserPosts/>} />
              <Route path="/updateUser/:userId" element={<UpdateUser/>} />
              <Route path="/myPosts" element={<MyPosts/>} />
              <Route path="/AddPost" element={<AddPost/>} />
              <Route path="/updatePost/:postId" element={<UpdatePost/>} />
              <Route path="/post/:postId" element={<CurrentPost/>} />
              <Route path="/" element={<Post/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/email-confirmation/:token" element ={<EmailConfirm />} />
              <Route path="/reset-password" element ={<ResetPassword />} />
              <Route path="/reset-password/:token" element ={<ResetPasswordConfirm />} />
            </Routes>
          </BrowserRouter>
          <Footer />
    </div>
  );
}


export default App;
