const mongoose = require('mongoose')
const Post = require('../models/post-message')

const getPosts = async (req,res) => {
    try {
        const postMessages = await Post.find()
        res.status(200).json(postMessages)
    } catch (error) {
        console.log(error.message)
    }
}

const createPost = async (req,res) => {
    const post = req.body
    const newPost = new Post(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status.json(error.message)
    }
}

const updatePost = async (req,res) => {
    const { id:_id } = req.params
    const post = req.body //Sent from FrontEnd

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with this id')
    }

    const updatedPost = await Post.findByIdAndUpdate(_id,{...post, _id},{ new:true })

    res.json(updatedPost)
}

const deletePost = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No post with this id")
    }

    await Post.findByIdAndDelete(id)
}

const likePost = async (req,res) => {
    const { id } = req.params

    if(!req.userId) {
        return res.json({ message: 'Unauthenticated' })
    }
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No post with this id")
    }
    
    const post = await Post.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    
    if(index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }


    const updatedPost = await Post.findByIdAndUpdate(id, post,{ new:true })

    res.json(updatedPost)
}

exports.getPosts = getPosts
exports.createPost = createPost
exports.updatePost = updatePost
exports.deletePost = deletePost
exports.likePost = likePost