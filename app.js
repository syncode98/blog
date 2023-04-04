const express=require("express")
const bodyParser=require("body-parser")
const app=express();
const ejs=require("ejs");
const lodash = require("lodash")


const posts=[];


const port=3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

const homeStartingContent="Welcome to my blog!Hope you have fun viewing it!"
const aboutContent="I am a student who aspires to be a full stack data scientist!"
const contactContent="Contact me at {}"
app.listen(port,function(){
    console.log("Started server on port "+port);
})
app.get("/",function(req,res){
   
    res.render("home",{startingContent:homeStartingContent,posts:posts})
})
app.get("/posts/:title",function(req,res){
    const title=lodash.lowerCase(String(req.params.title))
    
    posts.forEach(function(post){
        let currentTitle=lodash.lowerCase(post.title)
        if (title === currentTitle){
            res.render("post",{title:post.title,post:post.post})
        }

                
    })
})



app.get("/about",function(req,res){
    res.render("about",{aboutMeContent:aboutContent})
})
app.get("/compose",function(req,res){
    res.render("compose")
})
app.post("/compose",function(req,res){
    let post={
        title:req.body.title,
        post:req.body.post

    }
    posts.push(post)
    
    res.redirect("/")
})
