const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

//This is similar in every application

const signin = async (req,res) => {
    const { email, password } = req.body
        const existingUser = await User.findOne({ email })

        if(!existingUser) {
            return res.status(404).json({ message:"User do not exist. Try Again" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid credentials!" })
        }

        const token = jwt.sign( { email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

const signup = async (req,res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {

        if(existingUser) {
            return res.status(404).json({ message:"User Already exists" })
        }

        if (password !== confirmPassword) {
            return res.status(404).json({ message: "Passwords don't match" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
    
        const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" })
    
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

exports.signin = signin
exports.signup = signup