import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { MouseEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ResponsiveAppBar() {
    const { user, loading, logout } = useUser();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        setAnchorElUser(null);

        await logout();
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                color: "black",
                padding: "0px !important",
                // border: "1px solid red",
            }}
        >
            <Toolbar>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "flex", md: "none" },
                    }}
                >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
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
                            display: {
                                xs: "block",
                                md: "none",
                                color: "black",
                            },
                        }}
                    >
                        <MenuItem key={"post"} onClick={handleCloseNavMenu}>
                            <Link
                                to={`/`}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <Typography textAlign="center">
                                    {"Posts"}
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem key={"Create"} onClick={handleCloseNavMenu}>
                            <Link
                                to={`/create`}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <Typography textAlign="center">
                                    {"Create"}
                                </Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Box
                    sx={{
                        flexGrow: 1,
                        display: {
                            xs: "none",
                            md: "flex",
                            gap: "20px",
                            // border: "1px solid red",
                        },
                    }}
                >
                    <NavLink to={`/`} style={{ textDecoration: "none" }}>
                        <Button
                            key={"posts"}
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                display: "block",
                                color: "black",
                            }}
                        >
                            {"Post"}
                        </Button>
                    </NavLink>
                    <NavLink to={`/create`} style={{ textDecoration: "none" }}>
                        <Button
                            key={"create"}
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                display: "block",
                                color: "black",
                            }}
                        >
                            {"Create"}
                        </Button>
                    </NavLink>
                </Box>

                <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {!user && !loading && (
                            <>
                                <NavLink
                                    to={`/login`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        key={"login"}
                                        onClick={handleCloseNavMenu}
                                        variant="contained"
                                        sx={{
                                            my: 2,
                                            display: "block",
                                            color: "white",
                                        }}
                                    >
                                        {"Log In"}
                                    </Button>
                                </NavLink>
                                <NavLink
                                    to={`/signup`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        key={"signup"}
                                        variant="outlined"
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            display: "block",
                                            color: "black",
                                        }}
                                    >
                                        {"Sign up"}
                                    </Button>
                                </NavLink>
                            </>
                        )}
                    </Box>
                    {user && (
                        <>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        sx={{ backgroundColor: "black" }}
                                        alt={`${user.username}`}
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    key={"profile"}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                        to={`/user?id=${user._id}`}
                                    >
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem key={"logout"} onClick={handleLogout}>
                                    <Typography textAlign="center">
                                        {"Logout"}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export { ResponsiveAppBar };
