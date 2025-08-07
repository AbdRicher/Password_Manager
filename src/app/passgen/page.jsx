"use client"
import React from 'react'
import { useState } from 'react';
export default function passgen() {
    const [passlength, setpasslength] = useState(12)
    const [passwordgen, setpasswordgen] = useState('')
    const [error, seterror] = useState("")
    const [copttoclip, setcopttoclip] = useState("")

    const handleonSubmit=(e)=>{
        e.preventDefault()
        if (passlength<4 && passlength>20){
            seterror("The password length is not as per instruction given")
        }

        seterror("")
        passwordgenerator(passlength)


    }

    const passwordgenerator=(length)=>{

         const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";

         for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setpasswordgen(password)
    }

    const copytolclipboard=()=>{
        navigator.clipboard.writeText(passwordgen)
        setcopttoclip("Copied")
        setTimeout(() => {
            setcopttoclip("")
        }, 3000);
    }
  return (
    <div className='min-h-screen bg-gray-900 text-white p-4 md:p-8'>
      <div className="max-w-[80%] mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-400 mb-6">Generate Password</h2>
        <h3 className="text-gray-300 mb-4">Specify the length of password you want to generate</h3>
        
        <form onSubmit={handleonSubmit}>
          <div className='flex flex-col'>
            <label className='block text-sm font-medium text-gray-300 mb-2' htmlFor="password-length">
              Password length (4-64)
            </label>
            <input
              className='max-w-[30%] px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
              type="number"
              id="password-length"
              min="4"
              max="64"
              value={passlength}
              onChange={(e) => setpasslength(Number(e.target.value))}
              required
            />
            
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            
            <button
              className="mt-4 max-w-[100px] sm:max-w-[15%] bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              type='submit'
            >
              Generate
            </button>
          </div>
        </form>
        
        {passwordgen && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-300">Generated Password:</h3>
              <button
                onClick={copytolclipboard}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                Copy
              </button>
            </div>
            <div className="mt-2 p-3 bg-gray-700 rounded-lg font-mono break-all">
              {passwordgen}
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Password strength: {passlength >= 12 ? 'Strong' : passlength >= 8 ? 'Medium' : 'Weak'}
            </p>
            {copttoclip && (
              <p className="mt-2 text-sm text-green-500">{copttoclip}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
