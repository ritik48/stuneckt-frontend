import { Container } from "@mui/material";
import { ResponsiveAppBar } from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <Container>
            <ResponsiveAppBar />
            <Outlet />
        </Container>
    );
}
