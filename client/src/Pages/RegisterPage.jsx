import React,{useState} from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  
    const[username, setusername] = useState('');
    const[password, setpassword] = useState('');
    const[redirect,setredirect] = useState(false) 

  async function register(ev) {
    ev.preventDefault();

     const response = await fetch('http://localhost:8080/register',{
        method:"post",
        body: JSON.stringify({username,password}),
        headers:{"content-type":'application/json'},
        credentials:'include',
  })
      if(response.status === 200){
        alert('registration successful')
        setredirect(true)
      }else{
        alert('registration failed')
      }    
  } 

   if(redirect){
    return <Navigate to={"/login"} />
   }

  return (
    <div className='loginregisterpage'>
        <h1>Register</h1>
        <br />
        <br />
      <form onSubmit={register}>
        
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     value={username}
     onChange={ev => setusername(ev.target.value)}
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" 
     value={password}
     onChange={ev => setpassword(ev.target.value)}
     />
  </div>
  <button type="submit" className="btn btn-outline-secondary">Register Here</button>
</form>
    </div>
  )
}

export default RegisterPage
