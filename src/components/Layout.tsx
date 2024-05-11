import { Container } from "@mui/material";
import { ResponsiveAppBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Layout() {
    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <ResponsiveAppBar />
            <Outlet />
            <Toaster />
        </Container>
    );
}
