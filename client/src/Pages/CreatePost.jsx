import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header' : [1,2, false] }],
    [ 'bold' , 'italic' , 'underline' , 'strike' , 'blockquote'],
    [{'list': 'ordered'}, {'list':'bullet'}, {'indent': '-1'},{'indent':'+1'}],
    ['link','image'],
    ['clean']
  ]
}; 
 const formats = [
  'header',
  'bold','italic','underline','strike','blockquote',
  'list','bullet','indent',
  'link','image'
 ];

const CreatePost = () => {
 
  const[title , setTitle] = useState('');
  const[summary, setSummary] = useState('');
  const[author, setAuthor] = useState('');
  const[content, setContent] = useState('');
  const[files, setFiles] = useState('');
  const[redirect,setredirect] = useState(false);
 
  const CreateNewPost = async(ev) =>{
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('author',author);
    data.set('file',files[0]);
    data.set('content',content)
     ev.preventDefault();
    const response = await fetch("http://localhost:8080/post",{
      method:"post",
      body: data,
      credentials:'include'
     })
       if(response.ok){
         setredirect(true)
       }
        
  }
       if(redirect){
          return <Navigate to={'/'} />
       }

      //  console.log(content)
       console.log(files)

  return (
    <form className='createform' onSubmit={CreateNewPost}>
        <input type='title' placeholder={'title'} className='inputc' 
              value={title} 
              onChange={ev => setTitle(ev.target.value)} />
        <input type='summary' placeholder={'summary'}  className='inputc' 
               value={summary} 
               onChange={ev => setSummary(ev.target.value)}/>
         <input type='author' placeholder={'author'}  className='inputc' 
               value={author} 
               onChange={ev => setAuthor(ev.target.value)}/>       
        <input type='file'  className='inputc'
               
               onChange={ev => setFiles(ev.target.files)}  />
        <ReactQuill value={content} 
                    modules={modules} 
                    formats={formats}
                    onChange={newValue => setContent(newValue)}/>
        <button className='buttonc'>Create Post</button> 
        
    </form>
  )
}

export default CreatePost;
