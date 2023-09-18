const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const PostComment = require("../../models/PostComments");
const PostImage = require("../../models/PostImage");
const PostLike = require("../../models/PostLikes");
const PostVideo = require("../../models/PostVideos");
const Post = require("../../models/Posts");
const User = require("../../models/User");


const postController = {
    addPost: {
        middlewares: [
            authenticateJwtToken(['user', 'basic'])
        ],
        controller: async (req, res, next) => {
            try {
                let post = new Post({
                    createdAt: new Date(),
                    caption: req.body.caption,
                    likes: 0,
                    relatedUser: req.user.userId,
                    type: req.body.type
                })
    
                await post.save()

                if(post){
                    return res.status(201).send({
                        result: post
                    })
                }
            } catch (error) {
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
            
        }
    },
    addPostImage: {
        middlewares: [
            authenticateJwtToken(['user', 'basic']),
            upload('_post_image').fields([{name: 'image', maxCount: 1}])
        ],
        controller: async (req, res, next) => {
            try{
                let foundPost = await Post.findById(req.body.relatedPost)
               if(req.user.userId == foundPost.relatedUser){
                 
                let postImage = new PostImage({
                    image: generateFileName(req.files.image[0], '_post_image'),
                    relatedPost: req.body.relatedPost
                })

                await postImage.save()

                return res.status(201).send({result: postImage})
               }else{
                return res.status(404).send({message: 'Post Not Found'})
               }
            } catch (error) {
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    addPostVideo: {
        middlewares: [
            authenticateJwtToken(['user', 'basic']),
            upload('_post_video').fields([{name: 'video', maxCount: 1}])
        ],
        controller: async (req, res, next) => {
            try{
                let foundPost = await Post.findById(req.body.relatedPost)
               if(req.user.userId == foundPost.relatedUser){
                 
                let postVideo = new PostVideo({
                    video: generateFileName(req.files.video[0], '_post_video'),
                    relatedPost: req.body.relatedPost
                })

                await postVideo.save()

                return res.status(201).send({result: postVideo})
               }else{
                return res.status(404).send({message: 'Post Not Found'})
               }
            } catch (error) {
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    getPersonPostList: {
        middlewares: [
            authenticateJwtToken(['user', 'basic'])
        ],
        controller: async (req, res, next) => {
            try {
                let user = await User.findOne({username: req.params.username})
                let offset = req.query.offset
                let limit = req.query.limit
                if(user){
                    let data = []

                    let posts = await Post.find({relatedUser: user.id}).skip(offset).limit(limit)
                 
                     data = await Promise.all(posts.map(async post => {
                        let postImage = await PostImage.findOne({relatedPost: post.id});
                        let postVideo = await PostVideo.findOne({relatedPost: post.id});


                            return ({
                                post: post,
                                thumbnail: postImage ? postImage.image : postVideo.video
                            })
                    }))
                   

                    return res.status(200).send({result:  data})

                }else{
                    return res.status(400).send({message: 'User not found.'})
                }

            } catch (error) {
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    getById: {
        middlewares: [
            authenticateJwtToken(['user', 'basic'])
        ],
        controller: async (req, res, next) => {
            try{
                let post = await Post.findById(req.params.id).populate('relatedUser')
                if(post){
                    let postComments = await PostComment.find({relatedPost: post.id}).skip(0).limit(4)
                    let postLikes = await PostLike.find({relatedPost: post.id}).limit(2).populate('relatedUser')
                    let postImages = await PostImage.find({relatedPost: post.id})
                    let postVideos = await PostVideo.find({relatedPost: post.id})
                    let commentCounts = await PostComment.count({relatedPost: post.id})
                    let youLiked = await PostLike.findOne({relatedPost: post.id, relatedUser: req.user.userId})

                    return res.send({
                       result: {
                        post: post,
                        comments: postComments,
                        likes: postLikes,
                        images: postImages,
                        videos: postVideos,
                        commentCounts: commentCounts,
                        youLiked: !!youLiked,
                        // SAVE LATER
                        youSaved: false
                       }
                    })

                }else{
                    return res.status(400).send({message: 'Post not found.'})
                }

            } catch (error) {
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    }
}


module.exports = postController