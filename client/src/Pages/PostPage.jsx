import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Usercontext } from '../Usercontext';
import EditIcon from '@mui/icons-material/Edit';

const PostPage = () => {
    
    const[postInfo,setPostInfo] = useState(null);
    const {userInfo} = useContext(Usercontext);
    const {id} = useParams();
 
    useEffect(() => {
        fetch(`http://localhost:8080/post/${id}`)
        .then(response => {
            response.json()
            .then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    },[])
          
   if(!postInfo) return '';

  return (
    <div className='post-page'>
        <h2>{postInfo.title}</h2>
        
      <div className='postimg'>
     <img src={`http://localhost:8080/${postInfo.cover}`} alt="source"  />
      </div>
      <Link to="" className='postauthor'>By {postInfo.author}</Link>
        <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  )
}

export default PostPage;
