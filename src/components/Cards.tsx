import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { formatDate } from "../utils";
import { Post } from "../types";

export default function PostCard({ content, author, createdAt, _id }: Post) {
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 2, backgroundColor: "#fafbfc" }}>
            <CardHeader
                avatar={
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
                }
                title={`${author.username}`}
                subheader={`${formatDate(createdAt)}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
