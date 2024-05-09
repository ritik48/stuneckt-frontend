import { Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container sx={{ marginTop: "20px" }}>
            <Typography variant="h5" fontWeight={"bold"}>
                All Posts
            </Typography>
        </Container>
    );
}
