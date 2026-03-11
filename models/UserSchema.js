import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    minlength: 5,
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  isChecked:{
    type: Boolean,
    default: false
  },
  firstname:{
    type: String
  },
  lastname:{
    type: String
  },
  city:{
    type: String
  },
  country:{
    type: String
  },
  fileURL:[{
    type: String
  }],
  passport:{
    type: String
  },
  address:{
    type: String
  },
  zipcode:{
    type: String
  },
  resetToken:{
    type: String
  },
  resetTokenExpires:{
    type: String
  }
},{timestamps: true})

UserSchema.pre('save', async function () {
  if(!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model('User', UserSchema)
export default User