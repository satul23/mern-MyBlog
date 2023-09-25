import React,{useState,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import Post from '../Post';
import { Usercontext } from '../Usercontext';

const LoginPage = () => {
 
 const[username, setusername] =useState('');
 const[password, setpassword] = useState('');
 const[redirect, setredirect] = useState(false);
 const{setUserInfo} = useContext(Usercontext);

  async function login(ev){
   ev.preventDefault();
  
   const response =  await fetch("http://localhost:8080/login",{
        method:"post",
        body:JSON.stringify({username,password}),
        headers:{"content-type":"application/json"},
        credentials:'include',
     });
       
       console.log(response)
         if(response.ok){
          const userInfo = response.json()
          .then(userInfo =>{
            setUserInfo(userInfo)
          })

          const token = userInfo.token;
          localStorage.setItem('token', token);
          
          setredirect(true);
         }else{
          alert('wrong credentials');
         }

     }
   
        if(redirect){
         return <Navigate to={'/'} />
        }

  return (
    <div className='loginregisterpage'>
      <h1>Login</h1>
        <br />
        <br />

      <form onSubmit={login}>
        
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     value={username} 
     onChange={ev => setusername(ev.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
     value={password} 
     onChange={ev => setpassword(ev.target.value)}/>
  </div>
  <button type="submit" className="btn btn-outline-secondary">LogIn</button>
</form>
    </div>
  )
} 

export default LoginPage;
