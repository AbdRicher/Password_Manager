"use client"
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
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo/Brand Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VpnKeyIcon sx={{ mr: 1 }} />
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}
          >
            SecureVault
          </Typography>
        </Box>

        {/* Desktop Navigation */}

         <div>
     
    </div>
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => handleNavigation(item.navigation)} // Fixed this line
                color="inherit"
                startIcon={item.icon}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  borderRadius: 2,
                  px: 2,
                  py: 1
                }}
              >
                {item.text}
              </Button>
            ))}
            <div style={{ minWidth: '125px' }}> 
        {isLoggedIn ? ( <UserProfileButton getemail={getemail} getusername={getusername} handleLogout={handleLogoutfun} />) :(<Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<LoginRounded />}
            sx={{            
              py: 1,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#ff4081'
              }
            }}
            onClick={() => handleNavigation('/login')} // Added navigation for login
          >
            Login
          </Button>)}
          </div>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
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
        )}
      </Toolbar>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileOpen && (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            p: 2,
            backgroundColor: 'rgba(74, 20, 140, 0.95)'
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.text}
              fullWidth
              color="inherit"
              onClick={() => handleNavigation(item.navigation)}
              startIcon={item.icon}
               sx={{
             
              py: 1,

              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#ff4081'
              }
            }}
            >
              {item.text}
            </Button>
          ))}


          {isLoggedIn ? ( <UserProfileButton getemail={getemail} getusername={getusername} handleLogout={handleLogoutfun} />) :(<Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<LoginRounded />}
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#ff4081'
              }
            }}
            onClick={() => handleNavigation('/login')} // Added navigation for login
          >
            Login
          </Button>)}
        </Box>
      )}
    </AppBar>
  );
};

export default Header;