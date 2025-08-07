import mongoose from "mongoose";


const passwordschema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
    username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  gmail: {
    type: String,
    required: true,
  },
    createdAt: {
    type: Date,
    default: Date.now
  }

})

export default mongoose.models.Password || mongoose.model('Password', passwordschema);