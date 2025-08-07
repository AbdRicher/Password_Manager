"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

const password = () => {
    const getusername = Cookies.get('username');
      const getemail = Cookies.get('userEmail');
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
    if (getemail && getusername) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getemail, getusername]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await fetch(
          `/api/auth/get-passwords?email=${encodeURIComponent(getemail)}`
        );

        const result = await res.json();
        if (res.ok) {
          console.log("passwords received:", result.passwords);
          setPasswords(result.passwords || []);
        } else {
        setAlert({ visible: true, message: result.message, type: 'success' });

        }
      } catch (err) {
                setAlert({ visible: true, message: err });

      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-[80%] mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-amber-500/30">
         <h2 className="text-2xl font-bold text-amber-400 mb-6">
          Saved Passwords{" "}
          {isLoggedIn ? (
            <span className="text-amber-400 ">Welcome, {getusername}</span>
          ) : (
            <span className="text-amber-400 ">Login</span>
          )}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : passwords.length === 0 ? (
          <p className="text-center text-gray-500">No passwords found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-amber-400 rounded-full">
              <thead className="bg-amber-400 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Website</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Password</th>
                </tr>
              </thead>
              <tbody className="text-white border-t border-amber-400 rounded-full">
                {passwords.map((item, index) => (
                  <tr key={item._id || index} className="border-t border-amber-400 rounded-full">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{item.website}</td>
                    <td className="py-3 px-4">{item.username}</td>
                    <td className="py-3 px-4">{item.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default password;
