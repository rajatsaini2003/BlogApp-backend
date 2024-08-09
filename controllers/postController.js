const Post=require('../models/postModel')

exports.createPost=async(req,res)=>{
    try {
        const {body,title}=req.body;
        const post=new Post({
            title,body
        })
        const savedPost=await post.save();

        res.status(200).json({
            success: true,
            post:savedPost
        })
    } 
    catch (error) {
        return res.status(400).json({
            error:"error creating post"
        })
    }
}

exports.getAllPosts=async(req,res)=>{
    try {
        const posts=await Post.find().populate("comments").populate("likes").exec();
        res.json({
            posts
        })
    } 
    catch (error) {
        return res.status(400).json({
            error:"error getting posts"
        })
    }
}