import { Button, Container, Stack, Typography } from "@mui/material";
import TextArea from "../components/CustomTextarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    function handleSubmit() {}
    return (
        <Container sx={{ marginTop: "20px" }}>
            <Stack
                justifyContent={"center"}
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                gap={4}
                // sx={{ border: "1px solid red" }}
            >
                <Typography variant="h5" fontWeight={"bold"}>
                    Create Post
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={2} width={"100%"} justifyContent={"center"}>
                        <TextArea />
                        <Button
                            sx={{ alignSelf: "flex-start" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>
    );
}
