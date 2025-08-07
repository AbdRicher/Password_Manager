import User from '@/app/lib/database/models/User';
import jwt from 'jsonwebtoken';

export const registerUser = async (email, password,username) => {
  // Check if user exists
  const existingUsergmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingUsergmail) {
    throw new Error('Email already in use');
  }
  if (existingUsername){
    throw new Error('Username already in use');

  }

  // Create new user
  const user = new User({ username,email, password });
  await user.save();
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return token;
};

export const loginUser = async (email, password) => {
  // Find user
  const user = await User.findOne({ email });


  if (!user) {
    throw new Error('Invalid credentials user not exits');
  }

  // Check password
  const isMatch = user.password === password;
 
  if (!isMatch) {
    throw new Error('Invalid credentials password not matched');
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );


  return {
    token:token,
    username:user.username
  
  };
};