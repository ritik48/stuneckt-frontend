import { Container } from "@mui/material";
import { ResponsiveAppBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Layout() {
    return (
        <Container>
            <ResponsiveAppBar />
            <Outlet />
            <Toaster />
        </Container>
    );
}
