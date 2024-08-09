const Post=require('../models/postModel');
const Comment=require('../models/commentModel');

exports.createComment =async (req,res)=>{
    try {
        //fetch data from req body
        const {post,user,body}=req.body;
        //create a comment object
        const comment=new Comment({
            post,user,body
        });
        //save the new comment
        const savedComment=await comment.save();

        //find the post by id add the new comment to it's post comment array
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true}) // new :true -> return new data
                            .populate("comments") // populate the comment array with comment object wihout this only id will be included
                            .exec();
            res.status(200).json({
                success: true,
                post:updatedPost,
        })
    } 
    catch (error) {
        return res.status(500).json({
            error:"error while creating comment",
        })
        
    }
}