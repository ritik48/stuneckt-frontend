import { Button, Container, Stack, Typography } from "@mui/material";
import TextArea from "../components/CustomTextarea";
import { FormEvent, useState } from "react";
import { usePost } from "../contexts/PostContext";

export default function Create() {
    const { addPost } = usePost();

    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        await addPost(content);

        setLoading(false);
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
