"use client"

import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { storegmail,storeusername } from '@/redux/reducers/reducer'; // adjust path as needed
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { useState,useEffect } from 'react';
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  VpnKey as VpnKeyIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Password as PasswordIcon,
  Build as GeneratorIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  Login as LoginRounded
} from '@mui/icons-material';
import UserProfileButton from './UserProfileButton';
  import Cookies from 'js-cookie';
const Header = () => {
  const dispatch = useDispatch();

   const getusername = useSelector((state) => state.storeusername.username);
    const getemail = useSelector((state) => state.storegmail.gmail);
  const router = useRouter(); // Initialize router
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

 
const handleLogoutfun = () => {
  localStorage.clear(); // clear persisted storage
  dispatch(storegmail(null));
  dispatch(storeusername(null));
  Cookies.remove('userEmail');
  Cookies.remove('username');

  setIsLoggedIn(false);
  router.push("/login");
};


 useEffect(() => {
  if (getemail && getusername) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, [getemail, getusername]);

  
  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, navigation: '/dashboard' },
    { text: 'Passwords', icon: <PasswordIcon />, navigation: '/password' },
    { text: 'Generator', icon: <GeneratorIcon />, navigation: '/passgen' },
  ];

  // Navigation handler
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (

    
  
    <AppBar
  position="sticky"
  sx={{
    background: "linear-gradient(135deg, #6a1b9a, #8e24aa, #4a148c)",
    backgroundSize: "300% 300%",
    animation: "gradientShift 10s ease infinite",
    boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  }}
>
  <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
    {/* Logo with Glow Animation */}
 <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <VpnKeyIcon sx={{ mr: 1, color: "#fff", filter: "drop-shadow(0 0 6px #ff80ab)" }} />

    {/* Brand Name Typography with different font */}
    <Typography
      variant="h6"
      component="div"
      sx={{
        fontFamily: "'Poppins', sans-serif", // <-- custom font
        fontWeight: 600,
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#fff",
      }}
    >
      TrustVault
    </Typography>
  </Box>
</motion.div>




    {/* Desktop Navigation */}
    {!isMobile && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {navItems.map((item, idx) => (
          <motion.div
            key={item.text}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Button
              onClick={() => handleNavigation(item.navigation)}
              color="inherit"
              startIcon={item.icon}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                },
              }}
            >
              {item.text}
            </Button>
          </motion.div>
        ))}

        <Box sx={{ minWidth: "125px" }}>
          {isLoggedIn ? (
            <UserProfileButton getemail={getemail} getusername={getusername} handleLogout={handleLogoutfun} />
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<LoginRounded />}
                sx={{
                  py: 1,
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    backgroundColor: "#ff4081",
                    boxShadow: "0 6px 18px rgba(255,64,129,0.6)",
                  },
                }}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
            </motion.div>
          )}
        </Box>
      </Box>
    )}

    {/* Mobile Menu Button */}
    {isMobile && (
      <motion.div whileHover={{ scale: 1.1 }}>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileToggle}
          sx={{ ml: 2 }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </motion.div>
    )}
  </Toolbar>

  {/* Mobile Navigation Menu */}
  {isMobile && mobileOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          backgroundColor: "rgba(74, 20, 140, 0.95)",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        {navItems.map((item, idx) => (
          <motion.div key={item.text} whileHover={{ x: 5 }} transition={{ delay: idx * 0.05 }}>
            <Button
              fullWidth
              color="inherit"
              onClick={() => handleNavigation(item.navigation)}
              startIcon={item.icon}
              sx={{
                py: 1,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#ff4081",
                },
              }}
            >
              {item.text}
            </Button>
          </motion.div>
        ))}

        {isLoggedIn ? (
          <UserProfileButton getemail={getemail} getusername={getusername} handleLogout={handleLogoutfun} />
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<LoginRounded />}
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#ff4081",
              },
            }}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </Button>
        )}
      </Box>
    </motion.div>
  )}
</AppBar>


  );
};

/* 🔥 Animated Gradient Keyframes */
const styles = `
@keyframes gradientShift {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
`;


export default Header;