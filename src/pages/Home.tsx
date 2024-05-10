import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../apis";
import PostCard from "../components/Cards";
import { Post } from "../types";

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
    console.log(posts);
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
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                {!loading &&
                    posts.length > 0 &&
                    posts.map((post) => {
                        return (
                            <Grid item xs={4}>
                                <PostCard
                                    content={post.content}
                                    author={post.author}
                                    createdAt={post.createdAt}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Container>
    );
}
