import { loginUser } from '@/app/lib/services/authService';
import connectDB from '@/app/lib/database/connection';
import {cookies} from "next/headers"

export async function POST(request) {
  await connectDB();
  
  try {
     const res = await request.json();
    console.log('Registration request received',res);

    const email = res.email;
    const password = res.password;

    const array = await loginUser(email, password);
    const token = array.token;
    const username = array.username;

      cookies().set('userEmail', email, {
    httpOnly: false, // true if you want to make it not accessible from JS
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

    cookies().set('username', username, {
    httpOnly: false, // true if you want to make it not accessible from JS
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
    
    return new Response(JSON.stringify({ success: true,token, username, email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}