import { Container, Typography } from "@mui/material";
import PostCard from "../components/Cards";
import { Masonry } from "@mui/lab";
import { Paginate } from "../components/Paginate";
import { usePost } from "../contexts/PostContext";

export default function Home() {
    const { loading, posts, error, total, limit, page } = usePost();

    return (
        <Container sx={{ marginTop: "20px", border: "1px solid red" }}>
            <Typography variant="h5" fontWeight={"bold"}>
                All Posts
            </Typography>
            <Typography color={"grey"}>Total : {total} results</Typography>
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
            {!loading && (
                <Masonry
                    columns={{ xs: 1, sm: 3 }}
                    sx={{ marginTop: 2 }}
                    spacing={2}
                >
                    {posts.map((post) => {
                        return (
                            <PostCard
                                key={post._id}
                                content={post.content}
                                author={post.author}
                                createdAt={post.createdAt}
                                _id={post._id}
                            />
                        );
                    })}
                </Masonry>
            )}
            <Paginate totalPosts={total} limit={limit} page={page} />
        </Container>
    );
}
