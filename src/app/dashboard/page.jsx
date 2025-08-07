"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Delete } from "@mui/icons-material";
import CustomAlert from "@/Components/CustomAlert";
import Cookies from 'js-cookie';

export default function Dashboard() {

  // const getusername = useSelector((state) => state.storeusername.username);
  // const getemail = useSelector((state) => state.storegmail.gmail);

      const getusername = Cookies.get('username');
        const getemail = Cookies.get('userEmail');

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '', type: 'error' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: "",
      name: "",
      password: "",
    },
  });


  useEffect(() => {
    if (getemail && getusername) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getemail, getusername]);


  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);



 
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

  const [editIndex, setEditIndex] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const handleEdit = (entry, index) => {
    setEditIndex(index);
    setEditUsername(entry.username);
    setEditPassword(entry.password);
  };

  const handleSave = async (entry) => {
    try {
      const res = await fetch("/api/auth/passwords", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: getemail,
          oldUsername: entry.username,
          newUsername: editUsername,
          newPassword: editPassword,
        }),
      });

      if (res.ok) {
        setAlert({ visible: true, message: 'Updated successfully!', type: 'success' });

        // Update local state
        const updatedPasswords = [...passwords];
        updatedPasswords[editIndex] = {
          ...entry,
          username: editUsername,
          password: editPassword,
        };
        setPasswords(updatedPasswords);
        setEditIndex(null);
       window.location.reload(); 
           } else {
        setAlert({ visible: true, message: 'Failed to update'});

      }
    } catch (err) {
             setAlert({ visible: true, message: 'Error updating' });

    }
  };

  const handleDelete = async (entry) => {
    if (confirm(`Are you sure you want to delete password for ${entry.url}?`)) {
      try {
        const res = await fetch("/api/auth/passwords", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: getemail,
            oldUsername: entry.username,
          }),
        });

        if (res.ok) {
        setAlert({ visible: true, message: 'Deleted successfully!', type: 'success' });

          // Update local state
          const updatedPasswords = [...passwords];
          updatedPasswords[editIndex] = {
            ...entry,
            username: editUsername,
            password: editPassword,
          };
          setPasswords(updatedPasswords);
          setEditIndex(null);
         window.location.reload();
        } else {
        setAlert({ visible: true, message: 'Failed to delete' });
        }
      } catch (err) {
        setAlert({ visible: true, message: 'Error deleting' });

      }
    }
  };

  const onSubmit = async (data) => {
    if (!isLoggedIn) {
        setAlert({ visible: true, message: 'Please login first.' });

      return;
    }

    try {
      const res = await fetch("/api/auth/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: data.webname,
          username: data.name,
          password: data.password,
          email: getemail,
        }),
      });

      const result = await res.json(); // Optional: Parse JSON response

      if (res.ok) {
       window.location.reload();
        setAlert({ visible: true, message: 'Password added successfully!', type: 'success' });
        reset();
       
      } else {
        console.log("Failed to add:", result);
        setAlert({ visible: true, message: 'Failed to add. Maybe duplicate entry?' });
      }
    } catch (error) {
      console.log("Error:", error);
        setAlert({ visible: true, message: 'An error occurred while submitting the form.' });

    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-[80%] mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-400 mb-6">
          
          {isLoggedIn ? (
            <span className="text-amber-400 text-xl">Welcome,  <span className="text-white text-2xl" >{getusername}</span></span> 
          ) : (
            <span className="text-amber-400 ">Login</span>
          )}
        </h2>

        <h2 className="text-2xl font-bold text-amber-400 mb-6" >Add New Password{" "}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* URL Field */}
          <div className="mb-6">
            <label
              htmlFor="webname"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Website Name
            </label>
            <input
              id="webname"
              type="text"
              placeholder="Google"
              className={`w-full px-4 py-3 bg-gray-700 border ${
                errors.webname ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all`}
              {...register("webname", {
                required: "webname is required",
                pattern: {

                  message: "Enter a valid website name",
                },
              })}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          {/* Name & Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                placeholder="yourname"
                className={`w-full px-4 py-3 bg-gray-700 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all`}
                {...register("name", { required: "Username is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-gray-700 border ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all pr-10`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-amber-400"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Submit
          </button>
        </form>

         {/* Custom Alert Component */}
      <CustomAlert
        message={alert.message}
        type={alert.type}
        visible={alert.visible}
        onClose={() => setAlert({ ...alert, visible: false })}
      />
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold text-amber-400 mb-4">
          Saved Passwords
        </h1>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : passwords.length === 0 ? (
          <p className="text-gray-400">No passwords saved.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {passwords.map((entry, index) => {
                const isEditing = editIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-800 rounded-lg p-4 shadow-md border border-amber-500/20"
                  >
                    {/* Website */}
                    <div className="mb-2">
                      <p className="text-sm text-gray-400">Website</p>
                      <p className="text-lg font-semibold text-white break-all">
                        {entry.url}
                      </p>
                    </div>

                    {/* Username */}
                    <div className="mb-2">
                      <p className="text-sm text-gray-400">Username</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600"
                        />
                      ) : (
                        <p className="text-base text-white">{entry.username}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-400">Password</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600"
                        />
                      ) : (
                        <p className="text-base text-white">{entry.password}</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(entry)}
                            className="text-green-400 hover:text-green-500 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditIndex(null)}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(entry, index)}
                            className="text-amber-400 hover:text-amber-500 transition-colors"
                          >
                            <Edit fontSize="small" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Delete fontSize="small" />
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
