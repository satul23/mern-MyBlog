const express = require("express");
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const user = require('./models/user');
const post = require('./models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const multer = require("multer");
const uploadMiddleware = multer({dest:'uploads/'});

require('./db/conn')

const port = process.env.PORT || 8080;

const SECRET = "reddeadredemption234512231223";

app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use('/uploads', express.static(__dirname + "/uploads"))

app.post("/register", async(req,res) => {
    const {username,password} = req.body;
    console.log(`user username: ${username} and password: ${password}`)

   try{


    const userDoc = await user.create({username,
        password: bcrypt.hashSync(password, 10),
    });
         return  res.json(userDoc)
} catch(err){
    console.log(err)
}
});

app.post("/login" , async(req,res) => {
     const {username,password}= req.body;
  
    
    const userDoc = await user.findOne({username});

    const passok = bcrypt.compareSync(password, userDoc.password)
 
    if(passok){
       const user = {id: userDoc._id}  
      const token = jwt.sign({username, user}, SECRET );
      res.json({token , id:userDoc._id,username});
    }else{
      res.status(400).json("wrong credentials");
    }  
  
})


   function verifyToken(req,res,next){
    const token = req.header('authorization');

    if(!token){
       return res.status(401).json({message:"unauthorized"});
    }

     jwt.verify(token ,SECRET, (err, decoded) =>{
      if(err){
        return res.status(401).json({message:"unauthorized"})
      }
        
      req.user = decoded;
      next();
        
     });
         
   }
   
  app.get("/profile", verifyToken,( req,res) => {
      
    try {
  
      res.json({ user: req.user });
    } catch (error) {
      console.error("Error in /profile route:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

  app.post("/post",uploadMiddleware.single('file') , async(req,res) => {
    
    const {originalname,path} = req.file;
    console.log(req.file)
    const parts = originalname.split(".");
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
  
      fs.renameSync(path, newPath);
    
    const {title,summary,content,author} = req.body;

     const postDoc = await post.create({
         title,
         summary,
         author,
         content,
         cover: newPath,
        });

    res.json(postDoc);
    
  });

  app.get('/post' , async(req,res) => {
    const posts = await post.find()
    .populate('author',['username'])
    .sort({createdAt: -1})
    .limit(20)
     
    res.json(posts);
  })

  app.get( '/post/:id', async(req,res) => {
    const {id} = req.params;
    const postDoc = await post.findById(id)
    .populate('author', ['username']);
    res.json(postDoc)
       
  });
  
     
app.listen(port , () => {
    console.log(`listening to the port ${port}`)
});

