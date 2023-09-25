import React,{useContext,useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import { Usercontext } from './Usercontext';

const Header = () => {
  
//  const [isAuthenticated, setisAuthenticated] = useState(false);

 const{setUserInfo,userInfo} = useContext(Usercontext);

 const token = localStorage.getItem('token');
 

  useEffect( () => {
    fetch('http://localhost:8080/profile',{
       headers:{
          Authorization: token,
       },
       credentials:'include',
    }).then((response) => {
      if(response.ok){
        setUserInfo(userInfo)
        // setisAuthenticated(true)
      }
    }).catch((error) =>{
      console.log(error)
    })
  },[])
  
  const logout = () =>{
     localStorage.removeItem('token')
      // setisAuthenticated(false)
         setUserInfo(null)
  }

   const username = userInfo?.username;

  return (
    <div>
      <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        
        { username && (
          <>
           <Link to="/create">Create New Post</Link>
           <Link onClick={logout} >Logout</Link>
          </>
    )}  { !username && (
      <>
      <Link to="/register">Register</Link>
      <Link to="/login">LogIn</Link>
     </>
    )}

   {/* { isAuthenticated ? (
          <>
           <Link to="/create">Create New Post</Link>
           <Link onClick={logout} >Logout</Link>
          </>
   ) : (
      <>
      <Link to="/register">Register</Link>
      <Link to="/login">LogIn</Link>
     </>
)} */}
         
         </nav>
     </header>
    </div>
  )
}

export default Header;
