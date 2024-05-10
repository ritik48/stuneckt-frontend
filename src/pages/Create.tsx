import { Button, Container, Stack, Typography } from "@mui/material";
import TextArea from "../components/CustomTextarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createPost } from "../apis";
import { FormEvent, useState } from "react";

export default function Create() {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = await createPost(content);

        setLoading(false);
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        toast.success("Post created");
        navigate("/");
    };

    return (
        <Container sx={{ marginTop: "20px" }}>
            <Stack
                justifyContent={"center"}
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                gap={4}
            >
                <Typography variant="h5" fontWeight={"bold"}>
                    Create Post
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={2} width={"100%"} justifyContent={"center"}>
                        <TextArea content={content} setContent={setContent} />
                        <Button
                            sx={{ alignSelf: "flex-start" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating your post..." : "Submit"}
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>
    );
}
