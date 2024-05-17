import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGraphQL, NAVBAR_QUERY } from "../../services/contentfulService";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { auth, googleProvider } from "../../configs/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

import Cookies from "js-cookie";

import "./styles/navbar.css";

function Navbar() {
  const [page, setPage] = useState(null);
  const [data, setData] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchNavBar() {
      setData(await fetchGraphQL(NAVBAR_QUERY));
    }

    fetchNavBar();
  }, []);

  useEffect(() => {
    if (!data) return;
    setPage(data.pageCollection.items.filter((page) => page.showInNav));
  }, [data]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const fullName = user.displayName.split(" ");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ");

        Cookies.set("isLoggedIn", "true", { expires: 1, sameSite: "None", secure: true });
        Cookies.set("firstName", firstName, { expires: 1, sameSite: "None", secure: true });
        Cookies.set("lastName", lastName, { expires: 1, sameSite: "None", secure: true });
        setUser(user);
      } else {
        Cookies.remove("isLoggedIn");
        Cookies.remove("firstName");
        Cookies.remove("lastName");
        setUser(null);
      }
    });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("isLoggedIn");
      Cookies.remove("firstName");
      Cookies.remove("lastName");
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (!page) {
    return "Loading...";
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {page.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <div className="menu-item">
                      <Link to={`/page/${page.title}`}>{page.title}</Link>
                    </div>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                {user ? (
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" onClick={handleLogin}>
                    Login
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {page.map((page) => (
              <Button key={page.title} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                <div className="main-menu-item">
                  <Link to={`/page/${page.title}`}>{page.title}</Link>
                </div>
              </Button>
            ))}
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
