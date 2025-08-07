'use client';
import { useDispatch} from 'react-redux';
import { storegmail,storeusername } from '@/redux/reducers/reducer'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register() {
    const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setusername] = useState("")
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }
    e.preventDefault();
    console.log(email, password,username)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password,username }),
      });

      const data = await res.json();
       
       if (res.ok) {
          dispatch(storegmail(data.email)); 
          dispatch(storeusername(data.username));

          // localStorage.setItem('email', data.email);
        router.push('/dashboard');
       

      }
      else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
           <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all"
              required
            />



          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-amber-400"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
  
          </div>


                 <div className="mb-6">
            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmpassword"
                value={cpassword}
                onChange={(e) => setcPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all pr-10"
                required
              />

            </div>
  
          </div>


          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-amber-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}