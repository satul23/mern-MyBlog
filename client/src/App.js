import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Post from './Post';
import Header from './Header';
import './App.css';
import Layout from './Layout';
import LoginPage from './Pages/LoginPage';
import Indexpage from './Pages/Indexpage';
import RegisterPage from './Pages/RegisterPage';
import CreatePost from './Pages/CreatePost';
import { UserContextProvider } from './Usercontext';
import PostPage from './Pages/PostPage';


const App = () =>{
return(

  <UserContextProvider>
  <Routes>
    <Route path='/' element={<Layout />}>
    <Route index element={<Indexpage />}/> 
   <Route path={'/login'} element={<LoginPage />}/>
   <Route path={'/register'} element={<RegisterPage />}/>
   <Route path={"/create"} element={<CreatePost />} />
   <Route path={'/post/:id'} element={<PostPage />} /> 
   </Route> 
  </Routes>
  </UserContextProvider>
  );  
 

}

export default App;
