import express from 'express'
import User from '../models/UserSchema.js'
import protect from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import EmailRequestTemplate from '../utils/EmailRequestTemplate.js'
import EmailConfirmation from '../utils/EmailConfirmation.js'
import GetTransporter from './GetTransporter.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const frontendUrl = process.env.FRONTEND_URL
console.log(frontendUrl)

router.post('/register', async (req, res) => {
  const { email, password, firstname } = req.body
  try {
    if (!email || !password || !firstname) {
      return res.status(401).json({ error: "firstname, Email and Password required" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exist' })
    }

    const user = await User.create({ email, password, firstname })
    return res.status(201).json({
      userId: user._id,
      firstname: user.firstname,
      message: "Resgistration Successful, Kindly login"
    })
  } catch (err) {
    console.error("DATABASE ERROR:", err)
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(401).json({ message: "Email and Password required" })
    }
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Credentials not found" })
    }

    const matchPassword = await user.comparePassword(password)

    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect Password" })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return res.status(200).json({
      message: 'Login Successful',
      token: token,
      user: { email: user.email, userId: user._id }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

router.post('/reset-link', async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "Email not found" })

    const resetToken = crypto.randomBytes(32).toString('hex')

    user.resetToken = resetToken
    user.resetTokenExpires = Date.now() + 900000

    const resetLink = `${frontendUrl}/reset-password/${resetToken}`

    await user.save()

    const transporter = GetTransporter()

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "RESET YOUR PASSWORD",
      text: `NURAD-PLAG PASSWORD RESET LINK\n
              Follow the prompt to reset your password\n
              Click the link below to reset your password\n
              ${frontendUrl}/reset-password/${resetToken}
        `,
      html: EmailRequestTemplate(resetLink, user.firstname)
    });

    return res.status(200).json({ message: `Reset Link has been sent to ${email}` })

  } catch (err) {
    res.status(500).json({ messsage: 'Database Error' })
    console.log('Database Error', err)
  }
})

router.put('/reset-password/:resetToken', async (req, res) => {
  const { password } = req.body
  try {
    const user = await User.findOne({
      resetToken: req.params.resetToken,
      resetTokenExpires: { $gt: Date.now() }
    })

    if (!user) return res.status(401).json({ message: "Reset Link Expired" })

    user.password = password

    user.resetToken = undefined
    user.resetTokenExpires = undefined

    await user.save()

    const transporter = GetTransporter()

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "YOUR PASSWORD HAS BEEN RESET",
      text: "NURAD-PLAG PASSWORD RESET SUCCESSFUL",
      html: EmailConfirmation(user.firstname)
    });

    return res.status(200).json({ message: "Password Reset Successfully, Kindly Signin" })
  } catch (err) {
    res.status(500).json({ message: "Database Error" })
    console.log("Error", err)
  }
})

router.put('/update/profile', protect, async (req, res)=> {
  try{
    const user = await User.findOneAndUpdate({_id: req.userId}, req.body, 
      {
        returnDocument: 'after', 
        runValidators: true
      }
    ).select('-password')

    if(!user) return res.status(401).json({message: 'Unauthroized'})
    
    await user.save()

    return res.status(200).json({message: 'Profile updated succesfully'})

  }catch(err){
    res.status(500).json({message: err.message})
  }
})

router.put('/update/email', protect, async (req, res)=> {
  const {email} = req.body
  try{
    const user = await User.findById(req.userId)

    if(!user) return res.status(401).json({message: 'No user found'})

    if(email) return res.status(407).json({message: 'Email already exist'})

    user.email = email

    await user.save()

    return res.status(200).json({message: 'Email has been updated'})

  }catch(err){
    console.log(err)
    res.status(500).json({message: err.message})
  }
})

router.get('/profile/:userId', protect, async(req, res)=> {
  try{
    const user = await User.findById(req.userId).select('-password')
    if(!user) return res.status(401).json({message: 'Unauthorized'})
    
    return res.status(200).json(user)

  }catch(err){
    res.status(500).json({message: err})
  }
})

router.put('/upload/passport', protect, async (req, res)=> {
  const {passport} = req.body
  try{
    const user = await User.findOneAndUpdate(
      {_id: req.userId}, 
      {passport: passport}, 
      {
        returnDocument: 'after', 
        runValidators: true
      }
    )
    if(!user) return res.status(401).json({message: 'Unauthorized'})
    
    return res.status(200).json({message: 'passport uploaded'})
  }catch(err){
    console.log(err)
    res.status(500).json({message: 'Database Error'})
  }
})

export default router