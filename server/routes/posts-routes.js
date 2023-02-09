const express = require('express')

const postControllers = require('../controllers/posts-controllers')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/',postControllers.getPosts)
router.post('/',auth,postControllers.createPost)
router.patch('/:id',auth,postControllers.updatePost)
router.delete('/:id',auth, postControllers.deletePost)
router.patch('/:id/likePost',auth, postControllers.likePost)

module.exports = router