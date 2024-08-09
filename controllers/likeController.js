const Post=require('../models/postModel');
const Like=require('../models/likeModel');


exports.likePost=async(req,res)=>{
    try {
        const {post,user}=req.body;
        const like=new Like({
            post,user
        });
        const savedLike=await like.save();

        // update post collection
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
        .populate("likes").exec();
        res.status(200).json({
            success: true,
            post:updatedPost
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            error:' failed to like post'
        })
    }   
}

exports.unlikePost=async(req,res)=>{
    try {
        const {post,like}=req.body;
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like})
        const updatePost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true})
        res.status(200).json({
            success: true,
            post:updatePost
        })
    }   
    catch (error) {
        return res.status(500).json({
            success: false,
            error:' failed to unlike post',
            errorMessage: error.message
        })
    }
}