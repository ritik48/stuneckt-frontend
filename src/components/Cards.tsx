/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { formatDate } from "../utils";
import { Post } from "../types";
import { Link } from "react-router-dom";

export default function PostCard({
    content,
    author,
    createdAt,
    _id,
    showProfile,
}: Post & { showProfile: boolean }) {
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 2, backgroundColor: "#fafbfc" }}>
            <CardHeader
                avatar={
                    showProfile && (
                        <Avatar
                            sx={{
                                bgcolor: red[500],
                                width: "35px",
                                height: "35px",
                            }}
                            aria-label="user"
                        >
                            {author.username[0]}
                        </Avatar>
                    )
                }
                title={
                    showProfile && (
                        <Link
                            to={`/user?id=${author._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <Typography>{`${author.username}`}</Typography>
                        </Link>
                    )
                }
                subheader={`${formatDate(createdAt)}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}
