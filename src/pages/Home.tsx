import { Container,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../apis";
import PostCard from "../components/Cards";
import { Post } from "../types";
import { Masonry } from "@mui/lab";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await getPosts();

                if (!data.success) {
                    setError(data.message);
                    return;
                }

                setPosts(data.posts);
                setLoading(false);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container sx={{ marginTop: "20px" }}>
            <Typography variant="h5" fontWeight={"bold"}>
                All Posts
            </Typography>
            {loading && (
                <Typography
                    sx={{ marginTop: "20px" }}
                    variant="h4"
                    textAlign={"center"}
                >
                    Loading ...
                </Typography>
            )}
            {error && (
                <Typography
                    sx={{ marginTop: "20px" }}
                    variant="h4"
                    color={"red"}
                    textAlign={"center"}
                >
                    {error}
                </Typography>
            )}
            <Masonry columns={{ xs: 1, sm: 3 }} sx={{marginTop: 2}} spacing={2}>
                {posts.map((post) => {
                    return (
                        <PostCard
                            content={post.content}
                            author={post.author}
                            createdAt={post.createdAt}
                            _id={post._id}
                        />
                    );
                })}
            </Masonry>
        </Container>
    );
}
