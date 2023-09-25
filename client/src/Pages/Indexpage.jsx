import React, { useEffect, useState } from 'react';
import Post from '../Post';

const Indexpage = () => {
 
  const[posts, setPosts] = useState([])

  useEffect(() =>{
   const response = fetch('http://localhost:8080/post').
    then(response =>{ response.json().
    then(posts => {
      setPosts(posts)
    })
  })
     console.log(response)
     
  },[])
  console.log(posts)

  return (
    <>
    {
      posts.length > 0 && posts.map(post => (
        
        <Post {...post}  />
      
      ))
    }
    </>
  )
}

export default Indexpage;
