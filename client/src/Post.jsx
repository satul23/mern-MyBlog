import React from 'react';
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {


 
   return (
    <>
    
      <div className="post">
        <Link to={`/post/${_id}`}>
      <img src={'http://localhost:8080/'+ cover} alt="source" />
        </Link>
      <div className="texts">
        <Link className='textp' to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p>
        <Link to="" className="author">{author}</Link>
        <time style={{marginLeft:"9px"}}>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <h4>{summary}</h4>
        {/* <p dangerouslySetInnerHTML={{ __html: content }} /> */}
      </div>
    </div>
    
    </>
  )
  }

export default Post;
