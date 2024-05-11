import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { User } from "../types";
import { getUserData } from "../apis";
import { Masonry } from "@mui/lab";
import PostCard from "../components/Cards";
import { useUser } from "../contexts/UserContext";

function UserProfile() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

    const { user: loggedInUser } = useUser();

    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const data = await getUserData(userId as string);

            setLoading(false);
            if (!data.success) {
                setError(data.message);
                return;
            }
            setUser(data.user);
        };

        fetchUser();
    }, [userId]);

    console.log(user);

    if (!userId) {
        navigate("/");
    }

    return (
        <Container sx={{ marginTop: "20px" }}>
            <Stack
                marginBlock={2}
                gap={2}
                direction={{ xs: "column", sm: "row" }}
            >
                {loading && <Typography variant="h5">Loading...</Typography>}
                {error && (
                    <Typography variant="h5" color={"red"}>
                        {error}
                    </Typography>
                )}
                {!error && !loading && (
                    <>
                        <Stack
                            spacing={2}
                            sx={{
                                borderRight: "1px solid black",
                                paddingRight: "30px",
                            }}
                        >
                            <Stack
                                width={"300px"}
                                // border={"1px solid black"}
                                direction={"row"}
                                gap={2}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: red[500],
                                        width: "55px",
                                        height: "55px",
                                    }}
                                    aria-label="user"
                                >
                                    {user?.username[0]}
                                </Avatar>
                                <Stack>
                                    <Typography
                                        variant="body1"
                                        fontWeight={"bold"}
                                        color={"grey"}
                                    >
                                        Username
                                    </Typography>
                                    <Typography variant="h5">
                                        {user?.username}
                                    </Typography>
                                    {user?._id === loggedInUser?._id && (
                                        <Link to={`/edit`}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                            >
                                                Edit Profile
                                            </Button>
                                        </Link>
                                    )}
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography
                                    variant="body1"
                                    color={"grey"}
                                    fontWeight={"bold"}
                                >
                                    Followers
                                </Typography>
                                <Stack>
                                    {user?.followers.map((follower) => {
                                        return (
                                            <Box
                                                key={follower._id}
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"space-between"}
                                                gap={2}
                                                marginBottom={1}
                                            >
                                                <Typography>
                                                    {follower.username}
                                                </Typography>
                                                <button
                                                    style={{
                                                        fontSize: "16px",
                                                        border: "none",
                                                        outline: "none",
                                                        borderRadius: "5px",
                                                        padding:
                                                            "0.25em 0.65em",
                                                        backgroundColor:
                                                            "black",
                                                        color: "white",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Follow
                                                </button>
                                            </Box>
                                        );
                                    })}
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack sx={{ width: "100%" }}>
                            <Typography variant="h6">User Posts</Typography>
                            <Box sx={{ marginTop: "10px" }}>
                                <Masonry columns={{ xs: 1, sm: 2 }} spacing={2}>
                                    {(user as User)?.posts?.map((post) => {
                                        return (
                                            <PostCard
                                                key={post._id}
                                                content={post.content}
                                                author={post.author}
                                                createdAt={post.createdAt}
                                                _id={post._id}
                                                showProfile={false}
                                            />
                                        );
                                    })}
                                </Masonry>
                            </Box>
                        </Stack>
                    </>
                )}
            </Stack>
        </Container>
    );
}

export { UserProfile };
